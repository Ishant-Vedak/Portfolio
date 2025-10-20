from creds import USERNAME as un
from creds import PASSWORD as pw
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import json
import pandas as pd

'''  .\.venv\Scripts\activate  '''

allScholarships = []
duration = 80
options = Options()
options.binary_location = "C:\Program Files\Google\Chrome\Application\chrome.exe"

driver = webdriver.Chrome(service=Service(), options=options)

website = "https://google.com"
driver.get(website)

def Waitfor(time_waiting, selector, identifier): 
    WebDriverWait(driver, time_waiting).until(
        EC.presence_of_element_located((selector, identifier))
    )

WebDriverWait(driver, 5).until(
    EC.presence_of_element_located((By.CLASS_NAME, "gLFyf"))
)

Waitfor(5, By.CLASS_NAME, "gLFyf")

input_element = driver.find_element(By.CLASS_NAME, "gLFyf")
input_element.send_keys("scholartree.com" + Keys.ENTER)

Waitfor(30, By.XPATH, "//h3")

scholarship_website = driver.find_element(By.PARTIAL_LINK_TEXT, "ScholarTree")
scholarship_website.click()

Waitfor(20, By.XPATH, "//a")

scholarship_login = driver.find_element(By.XPATH, "//a[contains(@href,'/login')]")
scholarship_login.click()

Waitfor(20, By.XPATH, "//input")

email_input = driver.find_element(By.XPATH, "//input[@placeholder='E-mail']")
email_input.send_keys(un)

password_input = driver.find_element(By.XPATH, "//input[@placeholder='Password']")
password_input.send_keys(pw)

confirm_login = driver.find_element(By.XPATH, "//button[text()='Log in']")
confirm_login.click()

driver.implicitly_wait(5)
favorites = driver.find_element(By.XPATH, "//div[contains(text(), 'Favourite')]")
favorites.click()

items = driver.find_elements(By.CLASS_NAME, "scholarship-list-item")
itemsListCount = len(items)

for i in range(itemsListCount):
    items = driver.find_elements(By.CLASS_NAME, "scholarship-list-item")
    heading = items[i].text
    items[i].click()
    Waitfor(3, By.XPATH, "//h1")
    allScholarships.append(heading)
    driver.back()
    Waitfor(5, By.CLASS_NAME, "scholarship-list-item")


time.sleep(duration)
driver.quit()

split_scholarships = [scholarship.split('\n') for scholarship in allScholarships]

scholarship_dict = [{"id": idx, "Name": i[0], "Amount": i[1], "Date": i[2], "Requirements": i[3:]} for idx, i in enumerate(split_scholarships)]

df = pd.DataFrame(scholarship_dict)

df.to_json("scholarships.json", orient="records", indent=2, force_ascii=False)