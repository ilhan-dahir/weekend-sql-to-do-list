-- CREATE THE TABLE: 
CREATE TABLE to_do_list (
	"id" SERIAL PRIMARY KEY,
	"item" VARCHAR(100)
);

-- Insert multiple rows into the koalas table:
INSERT INTO koalas
	("item")
	VALUES
	('Create to do list app'),
    ('eat an apple'),
	('get groceries');
	

-- In postico, this command will show what is in your table currently:
SELECT * FROM to_do_list;