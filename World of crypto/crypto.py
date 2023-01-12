from bs4 import BeautifulSoup
import requests
import time

class CryptoScraper:
    
    def scrape_coin():
        url = 'https://gadgets360.com/finance/crypto-currency-price-in-india-inr-compare-bitcoin-ether-dogecoin-ripple-litecoin'
        html_text = requests.get(url).text
        soup = BeautifulSoup(html_text, 'lxml')

        table = soup.find('tbody')
        tr_tags = table.find_all('tr', class_ = '_cptbltr')
        info_list = []
        for tr in tr_tags:
            name = tr.find('div', class_ = '_flx crynm').text.strip()
            value = tr.find('td', class_ = '_rft _cpr').text.strip()
            market_cap = tr.find('td', class_ = '_rft _cpmc').text.strip()
            volume = tr.find('td', class_ = '_rft _cpvl').text.strip()

            each_crypto = {
                "name": name,
                "value": value[2:],
                "market_cap": market_cap[2:],
                "volume": volume[2:]
            }
            info_list.append(each_crypto)
        
        return info_list

    def scrape_news():
        google = "https://www.google.com/"
        url = "https://tinyurl.com/aanum8f9"
        html_text = requests.get(url).text
        soup = BeautifulSoup(html_text, 'lxml')

        body = soup.find('body')
        bullet_board = body.find_all('a')
        for each in bullet_board:
            if "nBDE1b G5eFlf" in str(each):
                req_url = google + each['href']
                break
            else:
                continue
        
        news_list = []
        html = requests.get(req_url).text
        html_soup = BeautifulSoup(html, 'lxml')
        body = html_soup.find('body')
        news_links = body.find_all('a')
        for each in news_links:
            if 'https' in str(each) and 'google' not in str(each):

                news = {
                    "title": each.text[:-12],
                    "url": each['href'][7:],
                    "posted": each.text[-12:]
                }
                news_list.append(news)
            else:
                continue
        return news_list