gigya-fix
=========

Express app to delete gigya users massively.

create a gigyainfo.json file same level as server.js and include a json like so:
{
    "apikey" :"mykey",
"secret" :"mysecret"
}

The basic premise is to hit this with apache benchmark and have node handle the calling of gigya rest api to delete the users.

==>had to do this because of a problem with sync between local and remote database.