const Koa = require("koa")
const cors = require("koa-cors")
var bodyParser = require('koa-body-parser');
const app = new Koa();
const koaOptions = {
  origin: true,
  credentials: true
};
const {addTask} = require("./shedule-manager/index")
const tasks={}
app.use(cors(koaOptions))
app.use(bodyParser());
app.use(async ctx => {
  console.log((ctx.request.url==="/shedule"),(ctx.request.method.toLowerCase()==="put"))
  if((ctx.request.url==="/shedule")&&(ctx.request.method.toLowerCase()==="put")) {
    console.log("WHAT")

    try{
      console.log(ctx.body)

      const newShedule = addTask(ctx.request.body.shedule,ctx.request.body.task,ctx.request.body.currentDate)
      console.log(newShedule)
      ctx.body = {newShedule}
    }catch (e) {
      console.log(e)
      ctx.response.statusCode=400
    }
  }else{
    ctx.response.statusCode=404
  }
});

app.listen(1338);