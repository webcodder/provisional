/**
 * Created by Administrator on 2016/7/25.
 */
var boomWebSocket = {
    //创建消息
    messageType: {ONETOONE: 0, ONETOMULTI: 1, GROUP: 2},
    //创建群组消息
    createGroupMessage: function (content, group, speaker) {
        return {'type': 2, 'content': content, 'speaker': speaker, 'group': group}
    },
    createSpeaker: function (name, num, headImg) {
        return {'name': name, 'num': num, 'headImg': headImg};
    }
}
