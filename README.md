# Phần mềm Tuyển sinh Sau đại học - HVCT

## Công nghệ sử dụng:

- React
- SQLite
- ExpressJs
- Template: HVCT
- Node version: 16.15.0

## Cách chạy project trên môi trường dev:

- Chạy lệnh `yarn install` để cài thư viện chung
- Chạy lệnh `yarn install-all` để cài thư viện CLIENT và SERVER
- Chạy lệnh `yarn start` để chạy song song code CLIENT và SERVER

## Cách đóng gói và triển khai ứng dụng:

- Chạy `yarn run build` để build ứng dụng.

## Các bước làm với git

- Step 1: Checkout sang nhánh main để lấy code mới nhất
  - git checkout main
- Step 2: Lấy code mới nhất
  - git pull origin main
- Step 3: Tạo ra 1 nhánh mới từ main. Theo quy tắc feature/tên*người_làm/tiêu*đề_task
  - git checkout -b feature/hoangbinh/create-new-page
- Step 4: Sau khi làm xong, đẩy code lên nhánh mới. Check lại code
  - git status
  - git add .
  - git commit -m "Your message"
  - git pull origin main
- Step 5: Nếu có conflict thì sửa và commit lại, không thì push lên nhánh mới
  - git push origin feature/hoangbinh/create-new-page
- Step 6: Tạo merge request

## Quy tắc khi viết code

- Tên lớp đặt theo PascalCase, ví dụ: UserClass, CategoryClass…
- Tên hàm và phương thức sử dụng camelCase, ví dụ getUser, getCategory…
- Tên biến cũng sử dụng camelCase loginUser, categoryList…
- Tên hằng số thì đặc biệt, viết hoa hết và cách nhau bởi dấu gạch dưới DISCOUNT_PERCENT, LIMIT_RATE…
- Tên bảng, tên cột trong Database sử dụng underscore và sử dụng danh từ số nhiều, ví dụ bảng oauth_clients, oauth_refresh_tokens.
