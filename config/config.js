module.exports = {
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'funnystring',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://alexzkazu:uplifty@ds047440.mongolab.com:47440/uplifty',
  FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || 'Facebook App Secret',
  LINKEDIN_SECRET: process.env.LINKEDIN_SECRET || 'LinkedIn Client Secret',
  TWITTER_KEY: process.env.TWITTER_KEY || 'Twitter Consumer Key',
  TWITTER_SECRET: process.env.TWITTER_SECRET || 'Twitter Consumer Secret',
  TWITTER_CALLBACK: process.env.TWITTER_CALLBACK || 'Twitter Callback Url'
};