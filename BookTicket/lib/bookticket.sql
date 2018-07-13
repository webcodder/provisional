-- 如果存在，删除
DROP DATABASE IF EXISTS `bookticket`;

-- 创建数据库
CREATE DATABASE `bookticket`;

-- 使用数据库
USE `bookticket`;

-- 用户表(user)
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`(
	`user_id` int(4) NOT NULL PRIMARY KEY auto_increment,  #用户id
	`user_name` varchar(32) DEFAULT NULL,  #用户名
	`user_password` varchar(16) DEFAULT NULL,  #用户密码
	`user_sex` varchar(2) DEFAULT '男',  #用户性别
	`user_phone` varchar(32) DEFAULT NULL,  #用户手机  
	`user_balance` double(32,2) DEFAULT '0' COMMENT '余额'  #用户账户
)ENGINE=INNODB CHARSET=utf8;
#DESC `user`;

INSERT INTO `user` 
	(`user_name`, `user_password`, `user_sex`, `user_phone`, `user_balance`) 
VALUES
	('张三', '123123', '女', '134897425', 128.0),
	('李四', '456456', '男', '134885685', 120.0),
	('王五', '789789', '男', '136987525', 118.0);
#SELECT * FROM `user`;


-- 电影表(movie)
DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie`(
	`movie_id` int(4) NOT NULL PRIMARY KEY auto_increment,  #电影id
	`movie_name` varchar(32) DEFAULT NULL,  #电影名
	`movie_performer` varchar(32) DEFAULT NULL,  #演员
	`movie_length` varchar(16) DEFAULT NULL,  #时长
	`movie_type` varchar(16) DEFAULT NULL,  #类型 
	`movie_time` DATE DEFAULT '1997-01-01',  #上映时间
	`movie_score` int(4) DEFAULT '0',  #评分
	`movie_info` varchar(255) DEFAULT NULL  #简介
)ENGINE=INNODB CHARSET=utf8;
#DESC `movie`;

INSERT INTO `movie` 
	(`movie_name`, `movie_performer`, `movie_length`, `movie_type`, `movie_time`, `movie_score`, `movie_info`) 
VALUES
	(
		'头号玩家', 
		'泰伊·谢里丹，奥利维亚·库克，西蒙·佩吉，本·门德尔森，马克·里朗斯，T·J·米勒', 
		'140分钟', '科幻', '2018-3-30', 88, 
		'该片根据恩斯特·克莱恩同名小说改编，讲述了一个现实生活中无所寄托、沉迷游戏的大男孩，凭着对虚拟游戏设计者的深入剖析，历经磨难，找到隐藏在关卡里的三把钥匙，成功通关游戏，并且还收获了网恋女友的故事。'
	),
	(
		'超时空同居', 
		'雷佳音，佟丽娅，张衣，于和伟，王正佳，陶虹，李念，李光洁，杨玏，范明，徐峥，杨迪，方龄，陈昊', 
		'101分钟', '科幻', '2018-5-18', 71, 
		'来自2018年谷小焦（佟丽娅 饰）与1999年陆鸣（雷佳音 饰），两人时空重叠意外住在同一个房间。从互相嫌弃到试图“共谋大业”，阴差阳错发生了一系列好笑的事情。乐在其中的两人并不知道操控这一切的神秘人竟是想要去2037年“投机取巧”的2018年的……'
	);
#SELECT * FROM `movie`;


-- 影院表(cinema)
DROP TABLE IF EXISTS `cinema`;
CREATE TABLE `cinema`(
	`cinema_id` int(4) NOT NULL PRIMARY KEY auto_increment,  #影院id
	`cinema_name` varchar(32) DEFAULT NULL,  #影院名
	`cinema_address` varchar(255) DEFAULT NULL,  #影院地址
	`cinema_city` varchar(16) DEFAULT NULL  #影院城市
)ENGINE=INNODB CHARSET=utf8;
#DESC `cinema`;

INSERT INTO `cinema` 
	(`cinema_name`, `cinema_address`, `cinema_city`) 
VALUES
	('杭州百美汇影城', '下城区延安路385号杭州嘉里中心3号楼4楼', '杭州市'),
	('卢米埃影城', '江干区庆春东路银泰百货庆春店6层', '杭州市'),
	('金逸国际影城', '江干区新塘路108号天虹购物中心B座六楼606号', '杭州市');
#SELECT * FROM `cinema`;


-- 影厅表(hall)
DROP TABLE IF EXISTS `hall`;
CREATE TABLE `hall`(
	`hall_id` int(4) NOT NULL PRIMARY KEY auto_increment,  #影厅id
	`hall_name` varchar(32) DEFAULT NULL,  #影厅名
	`cinema_id` int(4) DEFAULT NULL  #影院id
)ENGINE=INNODB CHARSET=utf8;
#DESC `hall`;

INSERT INTO `hall` 
	(`hall_name`, `cinema_id`) 
VALUES
	('1号厅', 1),
	('2号厅', 1),
	('3号厅', 1),

	('1号厅', 2),
	('2号厅', 2),
	('3号厅', 2),

	('1号厅', 3),
	('2号厅', 3),
	('3号厅', 3);
#SELECT * FROM `hall`;


-- 场次表(season)
DROP TABLE IF EXISTS `season`;
CREATE TABLE `season`(
	`season_id` int(4) NOT NULL PRIMARY KEY auto_increment,  #场次id
	`movie_id` int(4) DEFAULT NULL,  #电影id
	`season_time` datetime DEFAULT '1997-01-01 00:00:00',  #放映时间
	`season_price` double(16,2) DEFAULT '0' COMMENT '影票价格',  #支付价格
	`hall_id` int(4) DEFAULT NULL  #影厅id
)ENGINE=INNODB CHARSET=utf8;
#DESC `season`;

INSERT INTO `season` 
	(`movie_id`, `season_time`, `season_price`, `hall_id`) 
VALUES
	(1, '2018-4-2 10:00:00', 62, 1),
	(1, '2018-4-10 15:22:00', 62, 8),
	(2, '2018-5-23 17:30:00', 53, 3),
	(2, '2018-5-20 12:15:00', 53, 5);
#SELECT * FROM `season`;


-- 影票表(ticket)
DROP TABLE IF EXISTS `ticket`;
CREATE TABLE `ticket`(
	`ticket_id` int(4) NOT NULL PRIMARY KEY auto_increment,  #影票id
	`season_id` int(4) DEFAULT NULL,  #场次id
	`ticket_seat_id` int(4) DEFAULT NULL,  #选座位id
	`user_id` int(4) DEFAULT NULL,  #用户id
	`ticket_status` char(10) DEFAULT NULL  #影票状态
)ENGINE=INNODB CHARSET=utf8;
#DESC `ticket`;

INSERT INTO `ticket` 
	(`season_id`, `ticket_seat_id`, `user_id`, `ticket_status`) 
VALUES
	(1, 16, 1, '未支付'),
	(1, 11, 2, '待取票'),
	(1, 20, 3, '取票成功');
#SELECT * FROM `ticket`;

-- 评论表(evaluate)
#（id，评论内容，电影id，评论时间，用户id）
DROP TABLE IF EXISTS `evaluate`;
CREATE TABLE `evaluate`(
	`evaluate_id` int(4) NOT NULL PRIMARY KEY auto_increment,  #评论id
	`evaluate_content` varchar(255) DEFAULT NULL, #评论内容
	`movie_id` int(4) DEFAULT NULL,  #电影id
	`evaluate_time` DATE DEFAULT '1997-01-01',  #评论时间
	`user_id` int(4) DEFAULT NULL  #用户id
)ENGINE=INNODB CHARSET=utf8;
#DESC `evaluate`;

INSERT INTO `evaluate` 
	(`evaluate_content`, `movie_id`, `evaluate_time`, `user_id`) 
VALUES
	(
	 '游戏宅和影迷的春药！还原《闪灵》那场戏看到要爆炸了！值得去电影院刷十遍！', 
	 1, '2018-4-2', 1
	),
	(
	 '关于这部喜剧奇幻片，最喜剧的部分是“思诚”是别人的老公，最奇幻的部分是佟丽娅只有在电影里才能找到好男人。', 
	 2, '2018-5-20', 2
	);
#SELECT * FROM `evaluate`;