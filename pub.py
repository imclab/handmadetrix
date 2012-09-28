from pprint import pprint
from time import time
import sys
import urllib
import urllib2
from api_key import API_KEY

# You can also pass in a different valid feed like http://www.etsy.com/api/push/shops/etsyshop/listings/latest.atom as a parameter
FEED_URL = 'http://www.etsy.com/api/push/listings/latest.atom'   # Default feed

CALLBACK_URL = 'http://abe.is/a/badass/callback'  # Callback url for the hub to send pings to
HUB_URL = 'http://hub.etsy.com'

params = {
    'hub.mode': 'subscribe',        # subscribe | unsubscribe from a feed
    'hub.verify': 'sync',           # Whether the subscribe request is verified prior to returning or at a later time
    'hub.callback': CALLBACK_URL,   # The callback url on your PuSH subscriber server
    'hub.topic': FEED_URL,          # The feed you want to subscribe to
    'api_key': API_KEY,             # Not standard PuSH, passed to Etsy to verify you are authorized subscribe to this feed 
    'time_stamp': time(),
}

def scribe(params, mode=None, topic=None):
    headers = {}
    if mode:
        params['hub.mode'] = mode
    if topic:
        params['hub.topic'] = topic
    
    try:
        request = urllib2.Request(HUB_URL, data=urllib.urlencode(params), headers=headers)
        print urllib.urlencode(params)
        response = urllib2.urlopen(request)

        return response

    except Exception as e:
        print 'Problem with the request.'
        pprint(e)

if __name__ == '__main__':
    # Usage: python scribe.py [subscribe|unsubscribe] [feed_url]
    # Default is subscribe
    mode = 'subscribe'
    topic = FEED_URL
    if len(sys.argv) >= 2:
        mode = sys.argv[1]
        if len(sys.argv) >= 3:
            topic = sys.argv[2]
    scribe(params, mode=mode, topic=topic)
