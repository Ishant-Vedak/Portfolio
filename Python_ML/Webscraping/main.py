from creds import USERNAME, PASSWORD
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

'''  .\.venv\Scripts\activate  '''
duration = 100
options = Options()
options.binary_location = "C:\Program Files\Google\Chrome\Application\chrome.exe"

driver = webdriver.Chrome(service=Service(), options=options)

website = "https://google.com"
driver.get(website)

WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.CLASS_NAME, "gLFyf"))
)

input_element = driver.find_element(By.CLASS_NAME, "gLFyf")
input_element.send_keys("scholartree.com" + Keys.ENTER)

WebDriverWait(driver, 30).until(
    EC.presence_of_element_located((By.XPATH, "//h3"))
)

scholarship_website = driver.find_element(By.PARTIAL_LINK_TEXT, "ScholarTree")
scholarship_website.click()


time.sleep(duration)

driver.quit()

