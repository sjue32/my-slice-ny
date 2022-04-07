//



CREATE TABLE stores (
    "_id": serial NOT NULL,
    "name": varchar NOT NULL,
    "city": varchar NOT NULL,
    "borough": varchar NOT NULL,
    "slice-price": numeric(2, 2),
    "review-count": varchar NOT NULL,
    "total-score": integer NOT NULL,
    "avg-score": numeric(3, 2),
    CONSTRAINT "store_pk" PRIMARY KEY ("_id")
) WITH (
    OIDS=FALSE
);

CREATE TABLE public.shops (
    "_id": serial NOT NULL,
    "name": varchar NOT NULL,
    "city": varchar NOT NULL,
    "borough": varchar NOT NULL,
    "slice-price": numeric(2, 2),
    "review-count": varchar NOT NULL,
    "total-score": integer NOT NULL,
    "avg-score": numeric(3, 2),
    CONSTRAINT "shop_pk" PRIMARY KEY ("_id")
) WITH (
    OIDS=FALSE
);

CREATE TABLE reviews (
    "_id": serial NOT NULL,
    "date": date NOT NULL,
    "plain-score": integer NOT NULL,
    "crust-score": integer NOT NULL,
    "cheese-score": integer NOT NULL,
    "slice-review": varchar NOT NULL,
    "store_id": integer NOT NULL,
    "user_id": integer NOT NULL,
    CONSTRAINT "review_pk" PRIMARY KEY ("_id"),
    CONSTRAINT "review_fk0" FOREIGN KEY ("store_id") REFERENCES stores("_id"),
    CONSTRAINT "review_fk1" FOREIGN KEY ("user_id") REFERENCES users("_id")
) WITH stores(
    OIDS=FALSE
);

CREATE TABLE users (
    "_id": serial NOT NULL,
    "name": varchar NOT NULL,
    "review-count": integer NOT NULL
    CONSTRAINT "user_pk" PRIMARY KEY ("_id")
) WITH (
    OIDS=FALSE
);
