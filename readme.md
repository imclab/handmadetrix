## THE HANDMADETRIX
![](https://raw.github.com/astanway/handmadetrix/master/handmadetrix.png)

## Instructions:
* Register your app at https://www.etsy.com/developers/register
* Get an Etsy admin to sign you up for the feeds
* Clone this repo to your favorite server
* Create a file named api_key.py that contains the variable API_KEY="{YOUR KEY}"
* <code>npm install</code>
* <code>python pub.py</code> <-- this asks the PubSubHubbub server to hook up with data
* <code>node sub.js</code>  <-- this starts your node server to consume that jawn

## So pretty!
Indeed. You're looking at a real time feed of every new listing being uploaded onto Etsy. If you just want the data and not the matrix junk, check the source of sub.js. The meat happens around line 77, it should be easy enough to adapt to your needs.
