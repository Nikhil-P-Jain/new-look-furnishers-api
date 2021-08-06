const pool = require('../../config/db');
const DATE_FORMATTER=require('dateformat');
module.exports={
    createCity:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        city_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        city_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            'insert into city(city_name,state_id,city_status,city_created_date,city_updated_date) values(?,?,1,?,?)',
            [data.city_name,
            data.state_id,
            city_created_date,
            city_updated_date],
            (error,results,data)=>{
                console.log(error,"err")
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            })
    },
    getCity:callBack=>{
        pool.query(
            `select c.city_id,c.city_name,c.state_id,s.state_name,c.city_status,c.city_created_date,c.city_updated_date from city c join state s on c.state_id=s.state_id`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element => {
                    let cd=new Date(element.city_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.city_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.city_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.city_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                });
                return callBack(null,results);
            })
    },
    getCitybyid:(id,callBack)=>{
        pool.query(
            `select city_name,state_id,city_status,city_created_date,city_updated_date from city where city_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    updateCity:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        city_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update city set city_name=?,state_id=?,city_status=?,city_updated_date=? where city_id=?`,
            [
                body.city_name,
                body.state_id,
                body.city_status,
                city_updated_date,
                body.city_id
            ],
            (error,results,data)=>{
                console.log(error,results);
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },
    deleteCity:(id,callBack)=>{
        pool.query(
            `delete from city where city_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )        
    }

}
