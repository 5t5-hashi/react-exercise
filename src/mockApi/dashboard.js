import { http, HttpResponse } from "msw";

export const dashboard = [
  http.get("/api/todayOverview", async () => {
    return HttpResponse.json({
      todayOrder: {
        value: 128,
        comparison: 0.082,
        dataList: [80, 90, 86, 100, 98, 111, 128],
      },
      todayRevenue: {
        value: 38420,
        comparison: 0.051,
        dataList: [32000, 34000, 33000, 36000, 35000, 38000, 38420],
      },
      perCustomerTransaction: {
        value: 300,
        comparison: -0.024,
        dataList: [280, 300, 290, 320, 310, 340, 300],
      },
      inventoryWarning: {
        value: 5,
        comparison: 0,
        dataList: [10, 9, 8, 7, 6, 5, 5],
      },
    });
  }),
];
