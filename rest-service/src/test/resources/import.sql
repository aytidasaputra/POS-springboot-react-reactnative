insert into item(id,created_date,modified_date,name) values(1,'2020-03-04 06:08:28','2020-03-04 06:08:28','New Item');
insert into unit(id,created_date,modified_date,name,description) values(1,'2020-03-04 06:08:28','2020-03-04 06:08:28','Kg','KiloGram');
insert into transaksi(id,amount,type,created_date,modified_date) values(1,500,'penjualan','2020-03-04 06:08:28','2020-03-04 06:08:28');
insert into stock(created_date,modified_date,quantity,transaction_id,item_id,unit_id) values ('2020-03-04 06:08:28','2020-03-04 06:08:28',40,1,1,1);