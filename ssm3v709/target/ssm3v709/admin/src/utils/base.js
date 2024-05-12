const base = {
    get() {
        return {
            url : "http://localhost:8080/ssm3v709/",
            name: "ssm3v709",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/ssm3v709/front/h5/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于微信小程序的电影院票务系统"
        } 
    }
}
export default base
