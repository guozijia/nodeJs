class MyworkController {
    async mywork (ctx, next) {
        ctx.body = [
            { pic: "https://cdn.dribbble.com/users/5276/screenshots/15412507/media/b3e15a2a9956123d550592b49c3d5cb9.jpg?compress=1&resize=1000x750" },
            { pic: "https://cdn.dribbble.com/users/903897/screenshots/15431702/media/6531edef72cbcbba9ad924419a9b8b04.png?compress=1&resize=1000x750" },
            { pic: "https://cdn.dribbble.com/users/1675913/screenshots/15427958/media/976b2039e767b5c84970447f4e70fbd9.png?compress=1&resize=1000x750" },
            { pic: "https://cdn.dribbble.com/users/834683/screenshots/15427083/media/e0cbc12ece17b78b1cfc58c475092212.png?compress=1&resize=1000x750" },
            { pic: "https://cdn.dribbble.com/users/1253524/screenshots/15432022/media/831c8fb3a0dbb37c1263d23ddff4b3ca.jpg?compress=1&resize=1000x750"}
        ]
    }
}

module.exports = new MyworkController()