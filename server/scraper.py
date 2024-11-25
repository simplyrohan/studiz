import subprocess
import json

def get_quizlet(id):
    cmd = f"""curl 'https://quizlet.com/webapi/3.4/studiable-item-documents?filters%5BstudiableContainerId%5D={id}&filters%5BstudiableContainerType%5D=1&perPage=1000&page=1' \
    -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7' \
    -H 'accept-language: en-US,en;q=0.9' \
    -H 'cache-control: max-age=0' \
    -H 'dnt: 1' \
    -H 'priority: u=0, i' \
    -H 'sec-ch-ua: "Chromium";v="131", "Not_A Brand";v="24"' \
    -H 'sec-ch-ua-mobile: ?0' \
    -H 'sec-ch-ua-platform: "macOS"' \
    -H 'sec-fetch-dest: document' \
    -H 'sec-fetch-mode: navigate' \
    -H 'sec-fetch-site: none' \
    -H 'sec-fetch-user: ?1' \
    -H 'upgrade-insecure-requests: 1' \
    -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    """

    result = subprocess.run(cmd, shell=True, capture_output=True)

    raw = result.stdout.decode('utf-8')
    json_data = json.loads(raw)

    items = json_data['responses'][0]['models']['studiableItem']

    cards = [
        {
            'front': item['cardSides'][1]['media'][0]['plainText'],
            'back': item['cardSides'][0]['media'][0]['plainText']
        }
        for item in items
    ]

    return cards
