import { useState,useEffect } from "react";
import { Typography, Flex, Statistic } from "antd";
const { Title } = Typography;
import { todayOverview } from "@/api/dashboard.js";
import styles from "@/pages/dashboard/index.module.scss";

export default function Dashboard() {
  const [todayOverviewData, setTodayOverviewData] = useState(null);
  useEffect(() => {
    todayOverview().then((res) => {
      setTodayOverviewData(res);
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
              valueStyle={{ fontSize: "18px"}}
              suffix="单"
              value={todayOverviewData?.todayOrder?.value || 0}
            />
          </div>
          <Flex className="gap-6">
            <div className={getComparisonClassName(todayOverviewData?.todayOrder?.comparison)}>{todayOverviewData?.todayOrder?.comparison || 0}</div>
            <div>较昨日</div>
          </Flex>
        </div>
        <div className={styles.overviewItem}>
          <div className="text-[20px] text-[#333]"> 今日营收</div>
          <div className="mt-10">
            <Statistic
              classNames={{ prefix: "text-[18px]" }}
              valueStyle={{ fontSize: "18px"}}
              prefix="￥"
              value={todayOverviewData?.todayRevenue?.value || 0}
            />
          </div>
          <Flex className="gap-6">
            <div className={getComparisonClassName(todayOverviewData?.todayRevenue?.comparison)}>{todayOverviewData?.todayRevenue?.comparison || 0}</div>
            <div>较昨日</div>
          </Flex>
        </div>
        <div className={styles.overviewItem}>
          <div className="text-[20px] text-[#333]"> 客单价</div>
          <div className="mt-10">
              <Statistic
              classNames={{ prefix: "text-[18px]" }}
              valueStyle={{ fontSize: "18px"}}
              prefix="￥"
              value={todayOverviewData?.perCustomerTransaction?.value || 0}
            />
          </div>
          <Flex className="gap-6">
            <div className={getComparisonClassName(todayOverviewData?.perCustomerTransaction?.comparison)}>{todayOverviewData?.perCustomerTransaction?.comparison || 0}</div>
            <div>较昨日</div>
          </Flex>
        </div>
        <div className={styles.overviewItem}>
          <div className="text-[20px] text-[#333]"> 库存预警数</div>
          <div className="mt-10">
             <Statistic
              classNames={{ suffix: "text-[18px] text-[#666]" }}
              valueStyle={{ fontSize: "18px"}}
              suffix="个"
              value={todayOverviewData?.inventoryWarning?.value || 0}
            />
          </div>
          <Flex className="gap-6">
            <div className={getComparisonClassName(todayOverviewData?.inventoryWarning?.comparison)}>{todayOverviewData?.inventoryWarning?.comparison || 0}</div>
            <div>较昨日</div>
          </Flex>
        </div>
      </div>
    </div>
  );
}
