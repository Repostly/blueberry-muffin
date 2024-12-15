import Metrics from "@/models/Metrics";

export class Logger {
  constructor() {}

  // increments a metric in mongodb
  async inc(metric: 'videos' | 'time' | 'views') {
    const metrics = await Metrics.findOne();
    if (!metrics) {
      throw new Error("Metrics document not found");
    }
    
    switch (metric) {
      case 'videos':
        metrics.$inc('total_videos', 1)
        break
      case 'time':
        metrics.$inc('total_time_saved', 1)
        break
      case 'views':
        metrics.$inc('total_views_garnered', 1)
        break
    }

    await metrics.save()
  }
}