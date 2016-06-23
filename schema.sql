USE alertcam;

DROP TABLE IF EXISTS user_roles;
DROP TABLE IF EXISTS users;

CREATE  TABLE users (
  user_id int(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(45) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(60) NOT NULL ,
  enabled TINYINT NOT NULL DEFAULT 1 ,
  
  CONSTRAINT pk_users PRIMARY KEY (user_id)
);
  
CREATE TABLE user_roles (
  user_role_id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  role varchar(45) NOT NULL,
  
  CONSTRAINT pk_user_roles PRIMARY KEY (user_role_id),
  CONSTRAINT uk_user_roles_user_id_role UNIQUE KEY uni_user_id_role(role, user_id),
  KEY fk_user_idx (user_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO users(username, email, password, enabled)
VALUES ('priya','abc@abc.com','$2a$04$CO93CT2ObgMiSnMAWwoBkeFObJlMYi/wzzOnPlsTP44r7qVq0Jln2', true);
INSERT INTO users(username, email, password, enabled)
VALUES ('naveen','def@def.com','$2a$04$j3JpPUp6CTAe.kMWmdRNC.Wie58xDNPfcYz0DBJxWkucJ6ekJuiJm', true);

INSERT INTO user_roles (user_id, role)
VALUES (001, 'ROLE_USER');
INSERT INTO user_roles (user_id, role)
VALUES (002, 'ROLE_ADMIN');
INSERT INTO user_roles (user_id, role)
VALUES (002, 'ROLE_USER');