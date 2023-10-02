const amqplib = require('amqplib/callback_api');

amqplib.connect('amqp://localhost',(connectionError,connection)=>{
        if(connectionError){
            throw connectionError
        }


        connection.createChannel((chanelError,Chanel)=>{
            if(chanelError){
                throw chanelError
            };

            var queue = 'hello world ' ;
            var queue2="countingNumber";
            Chanel.assertQueue(queue,{
                durable:true
            })

            Chanel.consume(queue,(msg)=>{
                console.info(`from ${queue} :`+msg.content.toString());

            },{
                noAck: true
              });
              console.info(" receive on working ");

              Chanel.assertQueue(queue2,{
                durable:true
            })
            
            Chanel.consume(queue2,(msg)=>{
                console.info(`from ${queue2} :`+ msg.content.toString());

            },{
                noAck: true
              });

        });

})