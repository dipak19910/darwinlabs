temp = {
    a: 10,
    func: function (fun2 = function () {
        console.log(this.a)
    }) {
        console.log(this.a)
        fun2()
    }
}
temp.func()