## Important For those Who Have Cloned my Repo!

This API server requires that anyone who pulls from this REPO to edit the .env files manually otherwise you will recieve the error...

`throw new Error('PGDATABASE not set')`

## How To Fix `PGDATABASE not set` Error

For these databases to be found correctly, you must use the template of PGDATABASE=DATABASE_NAME.

For this REPO,

the file `.env.development` needs to read PGDATABASE=nc_games
the file `.env_test` needs to be PGDATABASE=nc_games_test


**Remember that it is crucial to omit the semicolon ';' at the end of our line as it will not work and cause more errors!**
