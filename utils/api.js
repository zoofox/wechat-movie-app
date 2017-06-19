let Env = require('../env')
module.exports = {
	getOpenId:Env.domain+'/users/getOpenId',
	getAccountByOpenId:Env.domain+'/users/getAccountByOpenId',
	getDiaryList:Env.domain+'/diaries/list',
	getOneDiary:Env.domain+'/diaries/get',
	getCommentList:Env.domain+'/comments/list'
}