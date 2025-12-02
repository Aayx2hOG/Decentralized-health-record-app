import { NextResponse } from 'next/server';
import { prismaClient } from 'db/src';

export async function GET() {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const accessLogs = await prismaClient.accessLog.findMany({
      where: {
        accessedAt: { gte: thirtyDaysAgo }
      },
      orderBy: { accessedAt: 'asc' }
    });

    const dailyStats = accessLogs.reduce((acc, log) => {
      const date = log.accessedAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, successful: 0, failed: 0, total: 0 };
      }
      acc[date].total++;
      if (log.success) {
        acc[date].successful++;
      } else {
        acc[date].failed++;
      }
      return acc;
    }, {} as Record<string, { date: string; successful: number; failed: number; total: number }>);

    const timeSeriesData = Object.values(dailyStats);

    const successVsFailed = {
      successful: accessLogs.filter(log => log.success).length,
      failed: accessLogs.filter(log => !log.success).length,
    };

    const recordAccesses = accessLogs.reduce((acc, log) => {
      acc[log.recordCid] = (acc[log.recordCid] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topRecords = Object.entries(recordAccesses)
      .map(([cid, count]) => ({ cid, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const hourlyPattern = Array.from({ length: 24 }, (_, i) => ({ hour: i, count: 0 }));
    accessLogs.forEach(log => {
      const hour = log.accessedAt.getHours();
      hourlyPattern[hour].count++;
    });

    const errorTypes = accessLogs
      .filter(log => !log.success && log.errorMessage)
      .reduce((acc, log) => {
        const error = log.errorMessage || 'Unknown error';
        acc[error] = (acc[error] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const errorDistribution = Object.entries(errorTypes)
      .map(([error, count]) => ({ error, count }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      timeSeriesData,
      successVsFailed,
      topRecords,
      hourlyPattern,
      errorDistribution,
    });
  } catch (e: any) {
    console.error('Failed to fetch analytics:', e);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
