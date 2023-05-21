import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.time.Duration;
import java.util.List;
import java.util.ArrayList;
import java.io.*;

public class QuoteGrabber {
    //Without a fileName defined when calling
    public static void run() {
        WebDriver driver = new ChromeDriver();
        List<WebElement> quoteDivs = new ArrayList<WebElement>();

        quoteDivs = getWebElements(driver);

        String fileName = "Put full directory and fileName here";

        System.out.println("Running 'checkForFileValidity(fileName);'");
        checkForFileValidity(fileName);
        System.out.println("Running 'writeWebElementsToFile(fileName, quoteDivs);'");
        writeWebElementsToFile(fileName, quoteDivs);

        driver.close();
    }
    //With a fileName defined when calling
    public static void run(String fileName) {
        WebDriver driver = new ChromeDriver();
        List<WebElement> quoteDivs = new ArrayList<WebElement>();

        quoteDivs = getWebElements(driver);

        System.out.println("Running 'checkForFileValidity(fileName);'");
        checkForFileValidity(fileName);
        System.out.println("Running 'writeWebElementsToFile(fileName, quoteDivs);'");
        writeWebElementsToFile(fileName, quoteDivs);

        driver.close();
    }

    public static List<WebElement> getWebElements(WebDriver driver){
        String url = "https://www.goodreads.com/quotes/tag/free";
        driver.get(url);

        //I didn't write this part, but I assume we can't just ask the browser when the page has finished loading?
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(12));
        List<WebElement> quoteDivs = driver.findElements(By.className("quoteText"));

        return quoteDivs;
    }
    public static void checkForFileValidity(String fileName){
        try {
            File myQuotesFile = new File(fileName);

            System.out.println("Check if file exists.");
            if (!myQuotesFile.exists()) {
                System.out.println("File doesn't exist, so creating it.");
                myQuotesFile.createNewFile();
                System.out.println("File created: " + myQuotesFile.getName());
            }else{
                System.out.println("File Exists.");
            }

            if(myQuotesFile.canWrite()){
                System.out.println("File Can Be Written into.");
            } else {
                System.out.println("Cannot write to File.");
                throw new IOException();
            }
        }catch (SecurityException secE){
            System.out.println("A security error occurred.");
            secE.printStackTrace();
        }
        catch (IOException e) {
            System.out.println("An error occurred. If your on Linux, make sure you include the leading '/' in your argument.");
            e.printStackTrace();
        }
    }
    public static synchronized void writeWebElementsToFile(String fileName, List<WebElement> elementList){
        try {
            FileWriter writeObj = new FileWriter(fileName);
            elementList.forEach((WebElement element) -> {
                try {
                    writeObj.write("\n\n{" + element.getText() + "}");
                }catch(IOException e){
                    System.out.println("Couldn't write text to file in 'writeWebElementsToFile().elementList.forEach()'");
                    e.printStackTrace();
                }
            });
        }catch(IOException e){
            System.out.println("Could not create 'FileWriter' in 'writeWebElementsToFile(String, List<>)'");
            e.printStackTrace();
        }
    }
}
