# MB-TEST

Hệ thống thu thập, lưu trữ, hiển thị dữ liệu các thông tin malware mới nhất, có
signature là RedlineStealer

## Author

Lê Huy Hiếu

## Components

### Frontend

ReactJS Webapp gồm 3 trang cơ bản List, Detail, Export List

* List: Bảng chứa danh sách các mã hash và thông tin kèm theo
* Detail: Hiển thị thông tin chi tiết của hash, export file
* Export List: Hiển thị danh sách các file đã export từ Splunk

### Server

* Local webserver sử dụng NodeJS
* Lấy dữ liệu từ Splunk, cung cấp API cho Frontend

### Worker01

* Chương trình thu thập dữ liệu từ Abuse và lưu trữ vào Splunk

### Worker02

* Chương trình làm nhiệm vụ xuất file dựa trên dữ liệu chỉ định

## Installation

### Step 01

Thêm file .env trong 3 thư mục Frontend, Server và Worker1. Sửa port server, địa chỉ server, địa chỉ, thông tin đăng nhập splunk, tên collection

* Frontend:

```
REACT_APP_SERVER_URL = http://localhost:1998
```

* Server:

```
PORT = 1998

splunk_host = localhost
splunk_user = admin
splunk_password = 12345678
splunk_port = 8089

splunk_collection_name = MB_TEST
```

* Worker1:

```
splunk_host = localhost
splunk_user = admin
splunk_password = 12345678
splunk_port = 8089

splunk_collection_name = MB_TEST
```

### Step 02

Cài đặt các package

* Frontend

```
cd Frontend
yarn install
```

* Server

```
cd Server
yarn install
cd Worker2
pip install -r requirements
```

* Worker1

```
cd Worker1
pip install -r requirements
```

### Step 03

Chạy chương trình

* Frontend

```
cd Frontend
yarn start
```

* Server

```
cd Server
yarn dev
```

* Worker1

```
cd Worker1
python main.py
```
