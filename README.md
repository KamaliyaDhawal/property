# blogs

# git clone https://github.com/KamaliyaDhawal/property.git
# cd ./blog
# npm install
# set .env
# import db_dump
# npm start

# postman link: https://www.getpostman.com/collections/cde1141d157a170b1863

# Note:
    - In-case If you get DB Error "GROUP BY clause and contains nonaggregated column" means you need to set sql_mode as ONLY_FULL_GROUP_BY
    - In-case If you get error like Unexpected end of JSON input means there are long data comming in our gourp by query need to set group_concat_max_len
