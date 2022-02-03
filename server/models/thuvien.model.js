module.exports.getQuanLi = function(conn, loginname, callback){
    const sql = 'select * from quanli where loginname = ?'
    conn.query(sql, loginname, callback)
}

module.exports.getThanhVien = function(conn, loginname, callback){
    const sql = 'select * from thanhvien where loginname = ?'
    conn.query(sql, loginname, callback)
}
// get thanh vien exist

// register user
module.exports.registerUser = function(conn, loginname, pass, fullname, phone, email, address, state, callback){
    const sql = 'insert into thanhvien(loginname, pass, fullname, phone, email, address, state_borrow) value (? , ?, ?, ?, ?, ?, ?)'
    conn.query(sql, loginname, pass, fullname, phone, email, address, state, callback)
}

// get name of uername to show at client
module.exports.getDanhMucSach = function(conn, callback){
    const sql = 'select * from danhmucsach';
    conn.query(sql, callback)
}
// Tìm kiếm teo Id
module.exports.getDanhMucSachId = function(conn, idbook, callback){
    const sql = 'select * from danhmucsach where idbook = ?';
    conn.query(sql, idbook, callback)
}
// Tìm kiếm theo Id book
module.exports.getDanhMucSachBookName = function(conn, bookname, callback){
    const sql = 'select * from danhmucsach where bookname like "%'+bookname+'%"';
    conn.query(sql, bookname, callback)
}
// Tìm kiếm theo tên tác giả
module.exports.getDanhMucSachAuthor = function(conn, author, callback){
    const sql = 'select * from danhmucsach where author like "%'+author+'%"';
    conn.query(sql, author, callback)
}
module.exports.createBook = function(conn, bookname, author, quantity, img, note, views, callback){
    const sql = 'insert into danhmucsach(bookname, author, quantity, img, note, views) value (?, ?, ?, ?, ?, ?)'
    conn.query(sql, bookname, author, quantity, img, note, views, callback)
    
}

module.exports.updateBook = function(conn, bookname, author, quantity, img, note, idbook, callback){
    var sql = 'update danhmucsach set bookname = ?, author = ?, quantity = ?, img = ?, note = ? where idbook = ?'
    conn.query(sql, bookname, author, quantity, img, note, idbook, callback)
}

///==================borrow
// cập nhật trạng thái mượn sách
module.exports.setState = (conn, value, loginname, callback) => {
    var sql = 'update thanhvien set state_borrow = ? where loginname = ?'
    conn.query(sql, value, loginname, callback)
   
}
// get loginname from idmuon in muonsach
module.exports.getLoginnameByIdMuon = (conn, idmuon, callback) => {
    var sql = 'select loginname from muonsach where idmuon = ?'
    conn.query(sql, idmuon, callback)
}

module.exports.getPhieuMuon = (conn, loginname, callback) => {
    var sql = 'select  * from  danhmucsach as dms, phieumuon as pm where dms.idbook = pm.idbook and loginname = ?'
    conn.query(sql, loginname, callback)
}
module.exports.getAllPhieuMuon = (conn, callback) => {
    var sql = 'select  distinct  pm.loginname, fullname, email, phone from phieumuon as pm, thanhvien as tv where pm.loginname = tv.loginname;'
    conn.query(sql, callback)
}
module.exports.addPhieuMuon = (conn, idbook, loginname, note, callback) => {
    var sql = 'insert into phieumuon(idbook, loginname, note) value (?, ?, ?)'
    conn.query(sql, idbook, loginname, note, callback)
}
module.exports.deletePhieuMuon = (conn, loginname, callback) => {
    var sql ='delete from phieumuon where loginname = ?'
    conn.query(sql, loginname, callback)
}
// manage request to borrow

    //add infor muon sach
module.exports.addMuonSach = (conn, loginname, idbook, ngaymuon, callback) => {
    const sql = 'insert into muonsach(loginname, idbook, ngaymuon) value(?, ?, ?)'
    conn.query(sql, loginname, idbook, ngaymuon, callback)

}
module.exports.getMuonSach = (conn, callback) => {
    const sql = 'select  distinct ms.loginname, fullname, email, phone from thanhvien as tv, muonsach as ms where ms.loginname = tv.loginname and ngaytra is null;'
    conn.query(sql, null, callback)
}
module.exports.getDetailsMuonSach = (conn, loginname, callback) => {
    var sql = 'select  * from  danhmucsach as dms, muonsach as ms where dms.idbook = ms.idbook and loginname = ? and ngaytra is null'
    conn.query(sql, loginname, callback)
}

module.exports.giveBook = (conn,ngaytra, idmuon, callback) => {
    const sql = 'update muonsach set ngaytra = ? where idmuon = ?'
    conn.query(sql, ngaytra, idmuon, callback )
}
module.exports.getView = (conn, idbook, callback) => {
    const sql = "select views from danhmucsach where idbook = ?"
    conn.query(sql, idbook, callback)
}
module.exports.plusView = (conn, value, idbook, callback) => {
   
    const sql =  'update danhmucsach set views = ? where idbook = ?'
    conn.query(sql, value, idbook, callback)
}
module.exports.getTopView = (conn, callback) => {
    const sql = "select * from danhmucsach order by views desc"
    conn.query(sql, callback)
}
// get all info logginname
module.exports.getInfoThanhVien = (conn, loginname, callback) => {
    const sql = 'select * from thanhvien where loginname = ?'
    conn.query(sql, loginname, callback)
}
// update
module.exports.updateUser = (conn, fullname, email, phone, address, loginname, callback) => {
    const sql = 'update thanhvien set fullname = ?, email = ?, phone = ?, address = ? where loginname = ?'
    conn.query(sql, fullname, email, phone, address, loginname, callback)
}

module.exports.loadAllHistory = (conn, callback) => {
    const sql = 'select ms.idbook, tv.loginname, ngaymuon, ngaytra, bookname, fullname,email, phone, address, author from muonsach as ms, thanhvien as tv, danhmucsach as dms where ms.idbook = dms.idbook and tv.loginname = ms.loginname order by ngaymuon DESC;'
    conn.query(sql, callback)
}
module.exports.loadUserHistory = (conn, loginname, callback) => {
    const sql = 'select ms.idbook, tv.loginname, ngaymuon, ngaytra, bookname, fullname,email, phone, address, author from muonsach as ms, thanhvien as tv, danhmucsach as dms where ms.idbook = dms.idbook and tv.loginname = ms.loginname and tv.loginname = ? order by ngaymuon asc'
    conn.query(sql, loginname, callback)
}
module.exports.loadBorrowingHistory = (conn, callback) => {
    const sql = 'select ms.idbook, tv.loginname, ngaymuon, ngaytra, bookname, fullname,email, phone, address, author from muonsach as ms, thanhvien as tv, danhmucsach as dms where ms.idbook = dms.idbook and tv.loginname = ms.loginname and ngaytra is null order by ngaymuon asc;'
    conn.query(sql, callback)
}
// số lượng sách đang mượn theo id sách
module.exports.quantityCountBorrow = (conn, callback) => {
    const sql = "select ms.idbook , count(*) as 'soluong' from muonsach as ms, thanhvien as tv, danhmucsach as dms where ms.idbook = dms.idbook and tv.loginname = ms.loginname  and ngaytra is null group by ms.idbook order by ngaymuon asc;"
    conn.query(sql, callback)
}