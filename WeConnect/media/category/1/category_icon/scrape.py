from selenium import webdriver
driver_path = "/home/chinonso/Downloads/chromedriver-linux64/chromedriver.exe"
PATH = "/home/chinonso/Downloads/chromedriver-linux64/chromedriver.exe"
driver = webdriver.Chrome()

url = "http://books.toscrape.com/"

driver.get(url)

print(driver.page_source)
