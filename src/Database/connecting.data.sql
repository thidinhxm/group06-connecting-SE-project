use connecting;

alter table account auto_increment = 1001;

insert into account(email, password, is_verified) values ("admin@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);

insert into account(email, password, is_verified) values ("teacher@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("teacher1@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("teacher2@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("teacher3@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("teacher4@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("teacher5@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("teacher6@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("teacher7@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("teacher8@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("teacher9@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);

insert into account(email, password, is_verified) values ("student@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("student1@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("student2@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("student3@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("student4@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("student5@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("student6@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("student7@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("student8@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);
insert into account(email, password, is_verified) values ("student9@gmail.com", "$2b$10$pyimPvv9ZmTVE9R62TNBHubC3v.qgmf/31/XXvFXrI77cMaX7pIL2", 1);


insert into admin(admin_id, display_name, fullname, type_admin) values (1001, "admin001", "Cao Lê Tuấn Tú", 1);

insert into tutor(tutor_id, display_name, fullname, phone, address, birthday, gender, job, grade, subject, time, area, min_salary) values (1002, "duc__cute___", "Nguyễn Văn Đức", "0919194646", "201 Nguyễn Văn Cừ, Phường 4, Quận 5, TPHCM","2000/10/23", 0, "Sinh viên", "Lớp 10, Lớp 11, Lớp 12, Luyện thi đại học", "Toán, Lý, Hóa", "T2 - tối, T4 - tối, T6 - tối, T7 - sáng - chiều", "Quận 1, Quận 3, Quận 5, Quận Bình Thạnh, Quận Tân Bình, Quận Tân Phú, Quận Phú Nhuận", "1500000");
insert into tutor(tutor_id, display_name, fullname, phone, address, birthday, gender, job, grade, subject, time, area, min_salary) values (1003, "toan_cute___", "Nguyễn Văn Toàn", "0985965267", "226 Bùi Thị Xuân, Phường 3, Quận Tân Bình, TPHCM","2001/08/25", 0, "Sinh viên", "Lớp 6, Lớp 7, Lớp 8, Lớp 9", "Toán, Lý, Hóa", "T3 - tối, T5 - tối, T7 - tối, CN - sáng - chiều - tối", "Quận 1, Quận 3, Quận 5, Quận Bình Thạnh, Quận Tân Bình, Quận Tân Bình, Quận Phú Nhuận", "1500000");
insert into tutor(tutor_id, display_name, fullname, phone, address, birthday, gender, job, grade, subject, time, area, min_salary) values (1004, "toandeptrai", "Nguyễn Văn Toản", "0355547474", "527 Sư Vạn Hạnh, Phường 12, Quận 10, TPHCM","1999/07/01", 0, "Sinh viên", "Lớp 6, Lớp 7, Lớp 8, Lớp 9", "Tiếng Anh", "T2 - tối, T4 - tối, T6 - tối, T7 - sáng - chiều", "Quận 1, Quận 3, Quận 5, Quận Bình Thạnh, Quận 10, Quận Phú Nhuận", "1500000");
insert into tutor(tutor_id, display_name, fullname, phone, address, birthday, gender, job, grade, subject, time, area, min_salary) values (1005, "hoang_pro", "Nguyễn Văn Hoàng", "0124656456", "95 Gò Dầu,Phường Tân Quý, Quận Tân Phú, TPHCM","2001/03/23", 0, "Sinh viên", "Lớp 10, Lớp 11, Lớp 12", "Toán, Hóa, Sinh", "T2 - tối, T4 - tối, T6 - tối, CN - sáng - chiều", "Quận 1, Quận 3, Quận 5, Quận Bình Thạnh, Quận Tân Phú, Quận Tân Bình, Quận Phú Nhuận", "1500000");
insert into tutor(tutor_id, display_name, fullname, phone, address, birthday, gender, job, grade, subject, time, area, min_salary) values (1006, "tuanpro", "Nguyễn Văn Tuấn", "0989939732", "20 Tăng Nhơn Phú,Phường Phước Long B, Thành Phố Thủ Đức, TPHCM","2000/06/05", 0, "Sinh viên", "Lớp 10, Lớp 11, Lớp 12, Luyện thi đại học, Luyện thi Toeic, Anh văn giao tiếp", "Tiếng Anh", "T2 - tối, T3 - tối, T4 - tối, T5 - tối, T6 - tối, T7 - sáng - chiều - tối, CN - sáng - chiều", "Thành phố Thủ Đức", "2000000");
insert into tutor(tutor_id, display_name, fullname, phone, address, birthday, gender, job, grade, subject, time, area, min_salary) values (1007, "thuy2k1", "Phan Thị Kim Thủy", "0985662512", "56 Hoàng Diệu 2, Phường Linh Chiểu, Thành Phố Thủ Đức, TPHCM","2002/10/07", 1, "Sinh viên", "Lớp 1, Lớp 2, Lớp 3, Lớp 4, Lớp 5", "Rèn chữ, Báo bài, Tiếng Anh, Toán", "T2 - tối, T4 - tối, T6 - tối, T7 - sáng - chiều", "Quận 1, Quận 3, Quận 5, Quận Bình Thạnh, Quận 10, Quận Phú Nhuận", "1500000");
insert into tutor(tutor_id, display_name, fullname, phone, address, birthday, gender, job, grade, subject, time, area, min_salary) values (1008, "tungvan", "Nguyễn Văn Tùng", "0879222456", "388 Tô Ngọc Vân, Phường Tam Phú, Thành Phố Thủ Đức, TPHCM","2001/04/12", 0, "Sinh viên", "Lớp 6, Lớp 7, Lớp 8, Lớp 9", "Toán, Lý, Hóa, Tiếng Anh, Báo bài", "T2 - tối, T4 - tối, T6 - tối, CN - sáng - chiều", "Thành phố Thủ Đức, Quận 1, Quận 3, Quận 5, Quận Bình Thạnh", "1500000");
insert into tutor(tutor_id, display_name, fullname, phone, address, birthday, gender, job, grade, subject, time, area, min_salary) values (1009, "badabum", "Nguyễn Hồng Nhung", "0355847224", "410 Nguyễn Xí, Phường 13, Quận Bình Thạnh, TPHCM","2002/01/20", 1, "Sinh viên", "Lớp 1, Lớp 2, Lớp 3, Lớp 4, Lớp 5", "Rèn chữ, Báo bài, Tiếng Anh, Toán", "T2 - tối, T4 - tối, T6 - tối, T7 - sáng - chiều", "Quận 1, Quận 3, Quận 5, Quận Bình Thạnh, Quận 10, Quận Phú Nhuận", "1500000");
insert into tutor(tutor_id, display_name, fullname, phone, address, birthday, gender, job, grade, subject, time, area, min_salary) values (1010, "khanhnguyen123", "Nguyễn Văn Khánh", "0971847224", "Hẻm 69 Đặng Thùy Trâm, Phường 13, Quận Bình Thạnh, TPHCM","2002/07/19", 0, "Sinh viên",  "Lớp 6, Lớp 7, Lớp 8, Lớp 9", "Toán, Lý, Hóa", "T2 - tối, T4 - tối, T6 - tối, T7 - sáng - chiều", "Quận 1, Quận 3, Quận 5, Quận Bình Thạnh, Quận 10, Quận Gò Vấp", "1500000");
insert into tutor(tutor_id, display_name, fullname, phone, address, birthday, gender, job, grade, subject, time, area, min_salary) values (1011, "cheeee", "Phạm Thị Trang", "0929443332", "Hẻm 206 Đường Số 20, Phường 5, Quận Gò Vấp, TPHCM","2000/11/11", 1, "Sinh viên", "Lớp 6, Lớp 7, Lớp 8, Lớp 9", "Toán, Lý, Hóa", "T2 - tối, T4 - tối, T6 - tối, T7 - sáng - chiều", "Quận 1, Quận 3, Quận 5, Quận Bình Thạnh, Quận 10, Quận Gò Vấp", "1500000");

insert into student(student_id, display_name, fullname, phone, address, birthday) values (1012, "vanloc", "Trần Văn Lộc", "0985742512", "310 Phạm Ngũ Lão, Phường Phạm Ngũ Lão, Quận 1, TPHCM","2005/10/31");
insert into student(student_id, display_name, fullname, phone, address, birthday) values (1013, "hai2k", "Nguyễn Thế Hải", "0985746453", "268 Lý Thường Kiệt, Phường 14, Quận 10, TPHCM","2006/05/04");
insert into student(student_id, display_name, fullname, phone, address, birthday) values (1014, "cucai", "Lê Đức Hải", "0355412567", "215 Hồng Bàng, Phường 11, Quận 5, TPHCM","2007/03/02");
insert into student(student_id, display_name, fullname, phone, address, birthday) values (1015, "thuykieu", "Nguyễn Thị Thúy Kiều", "0877242416", "4 Dương Quang Đông, Phường 5, Quận 8, TPHCM","2009/09/21");
insert into student(student_id, display_name, fullname, phone, address, birthday) values (1016, "thanh_ha__", "Đào Thị Thanh Hà", "0366242416", "385 Tên Lửa, Phường Bình Trị Đông B, Quận Bình Tân, TPHCM","2011/05/23");
insert into student(student_id, display_name, fullname, phone, address, birthday) values (1017, "duyen_dthg", "Nguyễn Cao Kỳ Duyên", "0364857888", "397 Liên Tỉnh 5, Phường 5, Quận 8, TPHCM","2013/10/23");
insert into student(student_id, display_name, fullname, phone, address, birthday) values (1018, "chaubau", "Nguyễn Khả Tân Châu", "0919432777", "702 Nguyễn Văn Linh, Phường Tân Hưng, Quận 7, TPHCM","2008/10/27");
insert into student(student_id, display_name, fullname, phone, address, birthday) values (1019, "vancong", "Đào Văn Công", "0917632273", "168 Võ Văn Ngân, Phường Linh Chiểu, Thành Phố Thủ Đức, TPHCM","2010/09/12");
insert into student(student_id, display_name, fullname, phone, address, birthday) values (1020, "ngocbich", "Châu Thị Bích Ngọc", "0984641523", "50 Lê Văn Việt, Phường Hiệp Phú, Thành Phố Thủ Đức, TPHCM","2007/10/02");
insert into student(student_id, display_name, fullname, phone, address, birthday) values (1021, "hoavan", "Trần Văn Hóa", "0971241544", "24 Lê Văn Việt, Long Thạnh Mỹ, Thành Phố Thủ Đức, TPHCM","2006/11/17");


alter table studentrequest auto_increment = 1001;
insert into studentrequest(student_id, phone, address, salary, grade, subject, time, other_request) values (1012, "0985742512", "310 Phạm Ngũ Lão, Phường Phạm Ngũ Lão, Quận 1, TPHCM", 2000000, "Lớp 11", "Toán, Hóa, Sinh", "T2-T4-T6 18h-20h hàng tuần", "gia sư học trường y dược cháu định thi khối B");
insert into studentrequest(student_id, phone, address, salary, grade, subject, time, other_request) values (1012, "0985742512", "310 Phạm Ngũ Lão, Phường Phạm Ngũ Lão, Quận 1, TPHCM", 1200000, "Lớp 11", "Tiếng Anh", "T3-T5 18h-20h hàng tuần", "cháu chỉ cần tiếng anh ở mức khá");
insert into studentrequest(student_id, phone, address, salary, grade, subject, time, other_request) values (1012, "0985742512", "310 Phạm Ngũ Lão, Phường Phạm Ngũ Lão, Quận 1, TPHCM", 600000, "Lớp 11", "Lý", "T7 18h-20h hàng tuần", "cháu chỉ cần học hóa học ở mức khá");
insert into studentrequest(student_id, phone, address, salary, grade, subject, time, other_request) values (1013, "0985746453", "268 Lý Thường Kiệt, Phường 14, Quận 10, TPHCM", 2500000, "Lớp 10", "Tiếng Anh", "T3-T5-T7 18h-20h hàng tuần", "gia sư có bằng IELTS 7.0 trở lên, dạy nâng cao tiếng anh cho cháu");
insert into studentrequest(student_id, phone, address, salary, grade, subject, time, other_request) values (1013, "0985746453", "268 Lý Thường Kiệt, Phường 14, Quận 10, TPHCM", 2000000, "Lớp 10", "Toán, Lý, Hóa", "T2-T4-T6 18h-20h hàng tuần", "cháu học khá, có thể dạy nâng cao");
insert into studentrequest(student_id, phone, address, salary, grade, subject, time, other_request) values (1017, "0364857888", "397 Liên Tỉnh 5, Phường 5, Quận 8, TPHCM", 1800000, "Lớp 3", "Toán, Tiếng Việt, Tiếng Anh", "T2-T3-T4-T5-T6 18h-20h hàng tuần chọn 4 buổi", "gia sư là nữ");
insert into studentrequest(student_id, phone, address, salary, grade, subject, time, other_request) values (1016, "0366242416", "385 Tên Lửa, Phường Bình Trị Đông B, Quận Bình Tân, TPHCM", 2000000, "Lớp 5", "Toán, Tiếng Việt, Tiếng Anh, Khoa học", "T2-T3-T4-T5-T6 18h-20h hàng tuần chọn 4 buổi", "gia sư là nữ, hiền hậu");
insert into studentrequest(student_id, phone, address, salary, grade, subject, time, other_request) values (1019, "0917632273", "168 Võ Văn Ngân, Phường Linh Chiểu, Thành Phố Thủ Đức, TPHCM", 1500000, "Lớp 6", "Toán, Lý", "T3-T5-T7 18h-20h hàng tuần", "gia sư là nam");
insert into studentrequest(student_id, phone, address, salary, grade, subject, time, other_request) values (1015, "0877242416", "4 Dương Quang Đông, Phường 5, Quận 8, TPHCM", 1600000, "Lớp 8", "Toán, Lý, Hóa", "T2-T4-T6 18h-20h hàng tuần", "gia sư có kinh nghiệm");
insert into studentrequest(student_id, phone, address, salary, grade, subject, time, other_request) values (1015, "0877242416", "4 Dương Quang Đông, Phường 5, Quận 8, TPHCM", 1600000, "Lớp 8", "Tiếng Anh", "T2-T4-T6 18h-20h hàng tuần", "gia sư có kinh nghiệm");
insert into studentrequest(student_id, phone, address, salary, grade, subject, time, other_request) values (1018, "0879222456", "388 Tô Ngọc Vân, Phường Tam Phú, Thành Phố Thủ Đức, TPHCM", 1000000, "Lớp 8", "Tin", "T7-CN 18h-20h hàng tuần", "gia sư giỏi về lập trình");


alter table post auto_increment = 1001;
insert into post(student_request_id, address, salary, grade, subject, time, extra_fee, other_request) values (1001, "Phạm Ngũ Lão, Phường Phạm Ngũ Lão, Quận 1, TPHCM", 2000000, "Lớp 11", "Toán, Hóa, Sinh", "T2-T4-T6 18h-20h hàng tuần", 30, "gia sư học trường y dược cháu định thi khối B");
insert into post(student_request_id, address, salary, grade, subject, time, extra_fee, other_request) values (1002, "Phạm Ngũ Lão, Phường Phạm Ngũ Lão, Quận 1, TPHCM", 1200000, "Lớp 11", "Tiếng Anh", "T3-T5 18h-20h hàng tuần", 30, "cháu chỉ cần tiếng anh ở mức khá");
insert into post(student_request_id, address, salary, grade, subject, time, extra_fee, other_request) values (1004, "Lý Thường Kiệt, Phường 14, Quận 10, TPHCM", 2500000, "Lớp 10", "Tiếng Anh", "T3-T5-T7 18h-20h hàng tuần", 30, "gia sư có bằng IELTS 7.0 trở lên, dạy nâng cao tiếng anh cho cháu");
insert into post(student_request_id, address, salary, grade, subject, time, extra_fee, other_request) values (1006, "Liên Tỉnh 5, Phường 5, Quận 8, TPHCM", 1800000, "Lớp 3", "Toán, Tiếng Việt, Tiếng Anh", "T2-T3-T4-T5-T6 18h-20h hàng tuần chọn 4 buổi", 30, "gia sư là nữ");
insert into post(student_request_id, address, salary, grade, subject, time, extra_fee, other_request) values (1007, "Tên Lửa, Phường Bình Trị Đông B, Quận Bình Tân, TPHCM", 2000000, "Lớp 5", "Toán, Tiếng Việt, Tiếng Anh, Khoa học", "T2-T3-T4-T5-T6 18h-20h hàng tuần chọn 4 buổi", 30, "gia sư là nữ, hiền hậu");
insert into post(student_request_id, address, salary, grade, subject, time, extra_fee, other_request) values (1008, "Võ Văn Ngân, Phường Linh Chiểu, Thành Phố Thủ Đức, TPHCM", 1500000, "Lớp 6", "Toán, Lý", "T3-T5-T7 18h-20h hàng tuần", 30, "gia sư là nam");
insert into post(student_request_id, address, salary, grade, subject, time, extra_fee, other_request) values (1009, "Dương Quang Đông, Phường 5, Quận 8, TPHCM", 1600000, "Lớp 8", "Toán, Lý, Hóa", "T2-T4-T6 18h-20h hàng tuần", 30, "gia sư có kinh nghiệm");


alter table tutorrequest auto_increment = 1001;
insert into tutorrequest(post_id, tutor_id, phone, payment_option) values (1001, 1002, "0919194646", "Chuyển khoản");
insert into tutorrequest(post_id, tutor_id, phone, payment_option) values (1003, 1006, "0989939732", "Chuyển khoản");
insert into tutorrequest(post_id, tutor_id, phone, payment_option) values (1004, 1009, "0355847224", "Đến trung tâm");






