# Schema Information

## make
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
make        | string    | not null

## model
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
make_id     | integer   | not null, foreign key (references make)
model       | string    | not null

## trim
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
model_id    | integer   | not null, foreign key (references model)
trim        | string    | not null
start_price | integer   | not null

## features
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
trim_id     | integer   | not null, foreign key (references model)
standard    | array     | not null
optional    | array     | not null
end_price   | integer   | not null
