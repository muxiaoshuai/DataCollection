mongod --dbpath "D:\Program Files\MongoDB\data\db" --logpath "D:\Program Files\MongoDB\data\log\mongod.log" --logappend --install --serviceName "MongoDB"

mongod --remove --serviceName  "MongoDB"

var persons=[{
	name:"daidai",
	age:22,
	email:"daidai@dai.com",
	c:36,
	m:86,
	e:32,
	country:"Korea",
	books:["JS","JAVA","PHP","MONGODB"]
},
{
	name:"superchenxiaodai",
	age:22,
	email:"superchenxiaodai@dai.com",
	c:37,
	m:83,
	e:35,
	country:"China",
	books:["JS","JAVA","P#","MONGODB"]
},
{
	name:"gougou",
	age:24,
	email:"gougou@dai.com",
	c:37,
	m:83,
	e:35,
	country:"China",
	books:["JAVA","P#","MONGODB"]
},
{
	name:"zhangsan",
	age:24,
	email:"zhangsan@dai.com",
	c:37,
	m:83,
	e:35,
	country:"ja",
	books:["JAVA","P#","MONGODB"]
},
{
	name:"ergouzi",
	age:24,
	email:"ergouzi@dai.com",
	c:37,
	m:83,
	e:35,
	country:"China",
	books:["JAVA","P#","jQuery"]
}]
for(var i=0;i<persons.length;i++){
	db.persons.insert(persons[i]);
}