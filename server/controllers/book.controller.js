const DB = require('../models/thuvien.model');

module.exports.getBooks = (req, res) => {
   
    try {
        DB.getDanhMucSach(req.conn, function(err, data){
            if(err) throw err
            //console.log(data)
            DB.quantityCountBorrow(req.conn, function(err1, data1) {
                if(err1)  throw err1
                for(var i = 0 ; i < data.length ; i++){
                    for(var j = 0 ; j < data1.length ; j++) {
                        if(data[i].idbook == data1[j].idbook){
                            data[i].countBorrow = data1[j].soluong
                           // console.log(data[i].idbook, data1[j].idbook)
                        } if(data[i].countBorrow == 0 || data[i].countBorrow > 0) continue
                         else {
                            data[i].countBorrow = 0
                        }
                    }
                }
               // console.log(data)
                res.json({ success: true, books: data })
            })
            
        })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

module.exports.createBook = (req, res) => {
    let {bookname, author, quantity, note} = req.body
    let img = ""
    if(req.file)  img = req.file.filename
    // Simple validation
	if (!bookname)
    return res
        .status(400)
        .json({ success: false, message: 'Book name is required' })
    if(!author)
    return res
        .status(400)
        .json({ success: false, message: 'Author name is required' })
    if(!quantity)
    return res
        .status(400)
        .json({ success: false, message: 'Quantity is required' })
    // hardly db
    const views = 0;
    if(!note) note = ''
   
    //all good
    try {
        DB.createBook(req.conn, [bookname, author, quantity, img, note, views], function(err){
            if(err) throw err
            DB.getDanhMucSach(req.conn, function(err, data){
                if(err) throw err
                res.json({ success: true, message: 'Created a book!', book: { idbook: data.length, bookname, author, quantity, img, note, views} })
            })
           
        })
        
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

module.exports.updateBook = (req, res) => {
    let {idbook, bookname, author, quantity, note, views} = req.body

    idbook = parseInt(idbook)
    let img = ""
    if(req.file)  img = req.file.filename
    if(note == null) note = ''
   
    try {
        if(img == "")
            DB.getDanhMucSachId(req.conn, [idbook], function(err, data){
                if(err) throw err
                img = data[0].img
                DB.updateBook(req.conn, [ bookname, author, quantity, img, note, idbook], function(err2){
                    if(err2) throw err2
                    res.json({ success: true, message: 'Updated a book!', book: { idbook, bookname, author, quantity, img, note, views} })

                })
            })
        else
            DB.updateBook(req.conn, [ bookname, author, quantity, img, note, idbook], function(err){
                if(err) throw err
                    res.json({ success: true, message: 'Updated a book!', book: { idbook, bookname, author, quantity, img, note, views} })
            
            })
        
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

module.exports.searchBooks = (req, res) => {
    const {idbook, bookname, author} = req.body
    try {
        if(idbook)
            DB.getDanhMucSachId(req.conn, idbook, function(err, data){
                if(err) throw err
                DB.quantityCountBorrow(req.conn, function(err1, data1) {
                    if(err1)  throw err1
                    for(var i = 0 ; i < data.length ; i++){
                        for(var j = 0 ; j < data1.length ; j++) {
                            if(data[i].idbook == data1[j].idbook){
                                data[i].countBorrow = data1[j].soluong
                              //  console.log(data[i].idbook, data1[j].idbook)
                            } if(data[i].countBorrow == 0 || data[i].countBorrow > 0) continue
                             else {
                                data[i].countBorrow = 0
                            }
                        }
                    }
                   // console.log(data)
                    res.json({ success: true, books: data })
                })
                
            })
        else if(bookname)
            DB.getDanhMucSachBookName(req.conn, bookname, function(err, data){
                if(err) throw err
                DB.quantityCountBorrow(req.conn, function(err1, data1) {
                    if(err1)  throw err1
                    for(var i = 0 ; i < data.length ; i++){
                        for(var j = 0 ; j < data1.length ; j++) {
                            if(data[i].idbook == data1[j].idbook){
                                data[i].countBorrow = data1[j].soluong
                              //  console.log(data[i].idbook, data1[j].idbook)
                            } if(data[i].countBorrow == 0 || data[i].countBorrow > 0) continue
                             else {
                                data[i].countBorrow = 0
                            }
                        }
                    }
                   // console.log(data)
                    res.json({ success: true, books: data })
                })
                
            })
            else
            DB.getDanhMucSachAuthor(req.conn, author, function(err, data){
                if(err) throw err
                DB.quantityCountBorrow(req.conn, function(err1, data1) {
                    if(err1)  throw err1
                    for(var i = 0 ; i < data.length ; i++){
                        for(var j = 0 ; j < data1.length ; j++) {
                            if(data[i].idbook == data1[j].idbook){
                                data[i].countBorrow = data1[j].soluong
                               // console.log(data[i].idbook, data1[j].idbook)
                            } if(data[i].countBorrow == 0 || data[i].countBorrow > 0) continue
                             else {
                                data[i].countBorrow = 0
                            }
                        }
                    }
                   // console.log(data)
                    res.json({ success: true, books: data })
                })
                
            })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

module.exports.deleteBook = (req, res) => {
   
}