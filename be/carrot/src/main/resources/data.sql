use carrot;

insert into users (user_id, created_at, image_url, nick_name, social_id)
values (1, now(), 'imageUrl1', 'nickname1', '1');
insert into users (user_id, created_at, image_url, nick_name, social_id)
values (2, now(), 'imageUrl2', 'nickname2', '2');
insert into users (user_id, created_at, image_url, nick_name, social_id)
values (3, now(), 'imageUrl3', 'nickname3', '3');

insert into location (location_id, name)
values (1, '역삼 1동');
insert into location (location_id, name)
values (2, '역삼 2동');
insert into location (location_id, name)
values (3, '역삼 3동');
insert into location (location_id, name)
values (4, '역삼 4동');

insert into user_location (user_location_id, is_main, location_id, user_id)
values (1, true, 2, 1);
insert into user_location (user_location_id, is_main, location_id, user_id)
values (2, false, 1, 1);
insert into user_location (user_location_id, is_main, location_id, user_id)
values (3, true, 1, 2);
insert into user_location (user_location_id, is_main, location_id, user_id)
values (4, false, 2, 2);
insert into user_location (user_location_id, is_main, location_id, user_id)
values (5, false, 1, 3);
insert into user_location (user_location_id, is_main, location_id, user_id)
values (6, true, 2, 3);

insert into image (image_id, image_url)
values (1, 'image1');
insert into image (image_id, image_url)
values (2, 'image2');
insert into image (image_id, image_url)
values (3, 'image3');
insert into image (image_id, image_url)
values (4, 'image4');
insert into image (image_id, image_url)
values (5, 'image5');
insert into image (image_id, image_url)
values (6, 'image6');

insert into category (category_id, image_url, name)
values (1, 'image1.png', 'category1');
insert into category (category_id, image_url, name)
values (2, 'image2.png', 'category2');
insert into category (category_id, image_url, name)
values (3, 'image3.png', 'category3');
insert into category (category_id, image_url, name)
values (4, 'image4.png', 'category4');

insert into product(product_id, created_at, content, name, price, status, category_id, location_id, user_id)
values (1, now(), 'product1', 'title1', 1000, 'ON_SALE', 1, 4, 1);
insert into product(product_id, created_at, content, name, price, status, category_id, location_id, user_id)
values (2, now(), 'product2', 'title2', 2000, 'ON_SALE', 1, 4, 1);
insert into product(product_id, created_at, content, name, price, status, category_id, location_id, user_id)
values (3, now(), 'product3', 'title3', 3000, 'ON_SALE', 1, 3, 2);
insert into product(product_id, created_at, content, name, price, status, category_id, location_id, user_id)
values (4, now(), 'product4', 'title4', 4000, 'ON_SALE', 2, 3, 2);
insert into product(product_id, created_at, content, name, price, status, category_id, location_id, user_id)
values (5, now(), 'product5', 'title5', 5000, 'ON_SALE', 3, 2, 2);
insert into product(product_id, created_at, content, name, price, status, category_id, location_id, user_id)
values (6, now(), 'product6', 'title6', 6000, 'ON_SALE', 3, 2, 3);
insert into product(product_id, created_at, content, name, price, status, category_id, location_id, user_id)
values (7, now(), 'product7', 'title7', 7000, 'ON_SALE', 4, 2, 3);
insert into product(product_id, created_at, content, name, price, status, category_id, location_id, user_id)
values (8, now(), 'product8', 'title8', 8000, 'ON_SALE', 4, 1, 3);

insert into product_image (product_image_id, is_main, image_id, product_id)
values (1, true, 1, 1);
insert into product_image (product_image_id, is_main, image_id, product_id)
values (2, false, 2, 1);
insert into product_image (product_image_id, is_main, image_id, product_id)
values (3, true, 2, 2);
insert into product_image (product_image_id, is_main, image_id, product_id)
values (4, true, 3, 3);
insert into product_image (product_image_id, is_main, image_id, product_id)
values (5, true, 4, 4);
insert into product_image (product_image_id, is_main, image_id, product_id)
values (6, true, 5, 5);
insert into product_image (product_image_id, is_main, image_id, product_id)
values (7, true, 6, 6);
insert into product_image (product_image_id, is_main, image_id, product_id)
values (8, true, 5, 7);
insert into product_image (product_image_id, is_main, image_id, product_id)
values (9, true, 4, 8);

insert into likes (like_id, product_id, user_id)
values (1, 1, 1);
insert into likes (like_id, product_id, user_id)
values (2, 1, 2);
insert into likes (like_id, product_id, user_id)
values (3, 1, 3);
insert into likes (like_id, product_id, user_id)
values (4, 2, 1);
insert into likes (like_id, product_id, user_id)
values (5, 2, 2);
insert into likes (like_id, product_id, user_id)
values (6, 3, 1);
insert into likes (like_id, product_id, user_id)
values (7, 4, 1);
insert into likes (like_id, product_id, user_id)
values (8, 5, 2);
insert into likes (like_id, product_id, user_id)
values (9, 6, 2);
insert into likes (like_id, product_id, user_id)
values (10, 7, 2);
insert into likes (like_id, product_id, user_id)
values (11, 7, 3);
