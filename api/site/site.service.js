const pool = require('../../config/db');
const DATE_FORMATTER=require('dateformat');
module.exports={
    createSite:(data,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        site_created_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        site_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        site_status=1;
        pool.query(
            'insert into site(site_name,site_address,site_city_id,site_status,site_created_date,site_updated_date) values(?,?,?,?,?,?)',
            [data.site_name,
            data.site_address,
            data.site_city_id,
            site_status,
            site_created_date,
            site_updated_date],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            })
    },
    getSite:callBack=>{
        pool.query(
            `select s.site_id,s.site_name,s.site_address,s.site_city_id,c.city_name,s.site_status,s.site_created_date,s.site_updated_date from site s join city c on s.site_city_id=c.city_id`,
            [],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                results.forEach(element => {
                    let cd=new Date(element.site_created_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    let ud=new Date(element.site_updated_date).toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
                    element.site_created_date=DATE_FORMATTER(cd,"yyyy-mm-dd hh:MM:ss");
                    element.site_updated_date=DATE_FORMATTER(ud,"yyyy-mm-dd hh:MM:ss");
                });
                return callBack(null,results);
            })
    },
    getSitebyid:(id,callBack)=>{
        pool.query(
            `select site_name,site_address,site_city_id,site_status,site_created_date,site_updated_date from site where site_id=?`,
            [id],
            (error,results,fields)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
    },
    updateSite:(body,callBack)=>{
        var cur=new Date().toLocaleString('en-US',{timeZone:'Asia/Calcutta'});
        site_updated_date=DATE_FORMATTER(cur,"yyyy-mm-dd hh:MM:ss");
        pool.query(
            `update site set site_name=?,site_address=?,site_city_id=?,site_status=?,site_updated_date=? where site_id=?`,
            [
                body.site_name,
                body.site_address,
                body.site_city_id,
                body.site_status,
                site_updated_date,
                body.site_id
            ],
            (error,results,data)=>{
                if(error){
                    return callBack(error);
                }
                return callBack(null,results);
            }
        )
        
    },
    deleteSite:(id,callBack)=>{
        pool.query(
            `delete from site where site_id=?`,
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
