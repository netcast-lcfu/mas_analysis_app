angular.module('myApp.services')
  //KPIService
  .factory('KpiService', function ($q, $filter, ApiService) {

    /**
     * 获取KPI完成进度查询条件
     * @param userId
     * @param token
     * @returns {*}
     */
    function getKpiCompletedProgressCondition(userId,token) {
      console.log('into KpiService getKpiCompletedProgressCondition method...');
      return ApiService.getKpiCompletedProgressCondition(userId,token).then(function (data) {
        if(Boolean(data.code) && data.code == 'success'){
          console.log('KpiService getKpiCompletedProgressCondition success...');
          console.log(data);
          return {
            adminAreaDatas:data.areaList,
            yearDatas:data.yearList,
            periodDatas:data.periodList
          };
        }else{
          return $q.reject(data.msg);
        }
      },function (err) {
        return $q.reject(err);
      });
    }

    /**
     * 获取KPI完成进度
     * @param userId
     * @param token
     * @param areaId
     * @param year
     * @param periodId
     */
    function getKPICompletedProgress(userId,token,areaId,year,periodId) {
      console.log('into KpiService getKPICompletedProgress method...');
      return ApiService.getKPICompletedProgress(userId,token,areaId,year,periodId).then(function (data) {
        console.log('KpiService getKPICompletedProgress success...');
        console.log(data);
        if(Boolean(data.code) && data.code == 'success'){
          return {
            xAxisData:data.xAxisData,
            seriesMonthData:data.seriesMonthData,
            seriesYearData:data.seriesYearData
          };
        }else{
          return $q.reject(data.msg);
        }
      },function (err) {
        return $q.reject(err);
      });
    }

    return {
      getKpiCompletedProgressCondition:getKpiCompletedProgressCondition,
      getKPICompletedProgress:getKPICompletedProgress
    }
  });
