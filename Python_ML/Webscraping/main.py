from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

options = Options()
options.binary_location = "C:\Program Files\Google\Chrome\Application\chrome.exe"

driver = webdriver.Chrome(service=Service(), options=options)

website = "https://google.com"
driver.get(website)

input_element = driver.find_element(By.CLASS_NAME, "gLFyf")
time.sleep(10)
input_element.send_keys("Selenium python" + Keys.ENTER)
time.sleep(10)

driver.quit()

