import { useState, useEffect } from "react";
import { Typography, Flex, Statistic } from "antd";
const { Title } = Typography;
import { todayOverview } from "@/api/dashboard.js";
import styles from "@/pages/dashboard/index.module.scss";
import * as echarts from "echarts";
export default function Dashboard() {
  const [todayOverviewData, setTodayOverviewData] = useState(null);
  useEffect(() => {
    todayOverview().then((res) => {
      setTodayOverviewData(res);
      // 初始化图表
      const todayOrderCharts = echarts.init(
        document.getElementById("todayOrderCharts")
      );
      todayOrderCharts.setOption({
        grid: {
          left: 10,
          top: 10,
          right: 10,
          bottom: 10,
        },
        xAxis: {
          show: false,
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          show: false,
          type: "value",
        },
        series: [
          {
            data: [10, 20, 15, 8, 12, 10, res?.todayOrder?.value || 0], // 暂时模拟数据，最后一天用真实数据
            type: "line",
            symbol: "none", // 去掉拐点圆圈
            lineStyle: {
              color: "#1677ff", // 使用 Ant Design 舒适的系统蓝
              width: 2,
            },
          },
        ],
      });
    });
  }, []);

  function getComparisonClassName(comparison) {
    return comparison > 0 ? styles.comparisonUp : styles.comparisonDown;
  }

  return (
    <div>
      <Title level={4}>今日概览</Title>
      <div className="grid grid-cols-4 gap-20">
        <div className={styles.overviewItem}>
          <div className="text-[20px] text-[#333]"> 今日订单数</div>
          <div className="mt-10">
            <Statistic
              classNames={{ suffix: "text-[18px] text-[#666]" }}
              styles={{ content: { fontSize: "18px" } }}
              suffix="单"
              value={todayOverviewData?.todayOrder?.value || 0}
            />
          </div>
          <Flex className="gap-6">
            <div
              className={getComparisonClassName(
                todayOverviewData?.todayOrder?.comparison
              )}
            >
              {todayOverviewData?.todayOrder?.comparison || 0}
            </div>
            <div>较昨日</div>
          </Flex>
          <div id="todayOrderCharts" className="w-full h-100 mt-10"></div>
        </div>
        <div className={styles.overviewItem}>
          <div className="text-[20px] text-[#333]"> 今日营收</div>
          <div className="mt-10">
            <Statistic
              classNames={{ prefix: "text-[18px]" }}
              styles={{ content: { fontSize: "18px" } }}
              prefix="￥"
              value={todayOverviewData?.todayRevenue?.value || 0}
            />
          </div>
          <Flex className="gap-6">
            <div
              className={getComparisonClassName(
                todayOverviewData?.todayRevenue?.comparison
              )}
            >
              {todayOverviewData?.todayRevenue?.comparison || 0}
            </div>
            <div>较昨日</div>
          </Flex>
        </div>
        <div className={styles.overviewItem}>
          <div className="text-[20px] text-[#333]"> 客单价</div>
          <div className="mt-10">
            <Statistic
              classNames={{ prefix: "text-[18px]" }}
              styles={{ content: { fontSize: "18px" } }}
              prefix="￥"
              value={todayOverviewData?.perCustomerTransaction?.value || 0}
            />
          </div>
          <Flex className="gap-6">
            <div
              className={getComparisonClassName(
                todayOverviewData?.perCustomerTransaction?.comparison
              )}
            >
              {todayOverviewData?.perCustomerTransaction?.comparison || 0}
            </div>
            <div>较昨日</div>
          </Flex>
        </div>
        <div className={styles.overviewItem}>
          <div className="text-[20px] text-[#333]"> 库存预警数</div>
          <div className="mt-10">
            <Statistic
              classNames={{ suffix: "text-[18px] text-[#666]" }}
              styles={{ content: { fontSize: "18px" } }}
              suffix="个"
              value={todayOverviewData?.inventoryWarning?.value || 0}
            />
          </div>
          <Flex className="gap-6">
            <div
              className={getComparisonClassName(
                todayOverviewData?.inventoryWarning?.comparison
              )}
            >
              {todayOverviewData?.inventoryWarning?.comparison || 0}
            </div>
            <div>较昨日</div>
          </Flex>
        </div>
      </div>
    </div>
  );
}
