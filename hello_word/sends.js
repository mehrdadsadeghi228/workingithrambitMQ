const amqp=require('amqplib/callback_api');

function counting(inputRange){
    for (let index = 0; index < inputRange.length; index++) {
        console.log(index);
        return index > 5 
    }
}

amqp.connect('amqp://localhost',(connectionError,connection)=>{
    if(connectionError){
        throw connectionError;
    }

    connection.createChannel((chanelError,chanel)=>{
        if(chanelError){
            throw chanelError;
        }
        var queue= 'hello world ';
        var message=" this is sends for testing rabbitMQ "
        var message2=" this is sends for testing rabbitMQ "
        
        var queue2="countingNumber";

        chanel.assertQueue(queue,{
            durable:true
        });

        chanel.assertQueue(queue2,{
            durable:true
        });
        chanel.sendToQueue(queue ,Buffer.from(message));
        console.log("data sends ");
        chanel.sendToQueue(queue2 ,Buffer.from(message2));

    })
});

