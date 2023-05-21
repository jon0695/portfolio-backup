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
        String url = "";

        quoteDivs = getWebElements(driver, url);

        String directory = "";
        String fileName = "famousQuotes.json";
        String completeFileName = directory + fileName;

        System.out.println("Running 'checkForFileValidity(fileName);'");
        checkForFileValidity(completeFileName);
        System.out.println("Running 'writeWebElementsToFile(fileName, quoteDivs);'");
        writeWebElementsToJSONFile(completeFileName, quoteDivs);

        driver.close();
    }
    //With a fileName defined when calling
    public static void run(String fileName) {
        WebDriver driver = new ChromeDriver();
        List<WebElement> quoteDivs = new ArrayList<WebElement>();
        String url = "";

        quoteDivs = getWebElements(driver, url);

        String directory = "";
        String completeFileName = directory + fileName;

        System.out.println("Running 'checkForFileValidity(fileName);'");
        checkForFileValidity(completeFileName);
        System.out.println("Running 'writeWebElementsToFile(fileName, quoteDivs);'");
        writeWebElementsToJSONFile(completeFileName, quoteDivs);

        driver.close();
    }

    public static List<WebElement> getWebElements(WebDriver driver, String url){

        driver.get(url);

        //I didn't write this part, but I assume we can't just ask the browser when the page has finished loading?
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(12));
        List<WebElement> quoteDivs = driver.findElements(By.className("quoteText"));

        return quoteDivs;
    }
    public static boolean checkForFileValidity(String fileName){
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
            return myQuotesFile.canWrite();
        }catch (SecurityException secE){
            System.out.println("A security error occurred.");
            secE.printStackTrace();
        }
        catch (IOException e) {
            System.out.println("An error occurred. If your on Linux, make sure you include the leading '/' in your argument.");
            e.printStackTrace();
        }
    return false;
    }
    public static synchronized void writeWebElementsToJSONFile(String fileName, List<WebElement> elementList){

        try {
            FileWriter writeObj = new FileWriter(fileName);
            writeObj.write("{");
            for(int i = 0; i < elementList.size(); i++){
                String key = ("quote" + i);
                String value = scrubText(elementList.get(i).getText());
                try {
                    writeObj.write(String.format(" \"%s\" :  \"%s\" ", key, value));
                    if(i != elementList.size()-1){
                        writeObj.write(",\n\n");
                    }
                }catch(IOException e){
                    System.out.println("Couldn't write text to file in 'writeWebElementsToFile().elementList.forEach()'");
                    e.printStackTrace();
                }
            };
            writeObj.write("}");
            writeObj.close();
        }catch(IOException e){
            System.out.println("Could not create 'FileWriter' in 'writeWebElementsToFile(String, List<>)'");
            e.printStackTrace();
        }
    }
    public static String scrubText(String value){
        value = value.replaceAll("\"","");
        value = value.replaceAll("\n","");
        value = value.replaceAll("“","'");
        value = value.replaceAll("”","'");
        value = value.replaceAll("―", " ~~");
        return value;
    }
}
