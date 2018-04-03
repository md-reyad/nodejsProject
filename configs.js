var config = {
    database: {
        host:      '192.168.152.221',     // database host
        user:       'ocpl',         // your database username
        password: 'ocpl@321',         // your database password
        port:       3306,         // default MySQL port
        db:       'test_db'         // your database name

    },
    'users_table': 'users',
    server: {
        host: '192.168.152.221',
        // port: '8000'
    }
}

module.exports = config