from flask import *
import scraper
import urllib.parse

app = Flask(__name__)


@app.route("/")
def index():
    res = {
        'url': None,
        'success': None,
        'error': None,
        'cards': None
    }
    try:
        args = request.args
        if "url" in args:
            url = args["url"]
            res['url'] = url

            parsed = urllib.parse.urlparse(url)
            possible_id = parsed.path.split("/")[1]
        
            try:
                id = int(possible_id)
                res['cards'] = scraper.get_quizlet(id)
                res['success'] = True

            except ValueError:
                # print("Invalid URL")
                res['error'] = "Invalid URL"
                res['success'] = False
        else:
            res['error'] = "URL not provided"
            res['success'] = False
    except Exception as e:
        res['error'] = str(e)
        res['success'] = False
        
    return jsonify(res)


if __name__ == "__main__":
    app.run()
