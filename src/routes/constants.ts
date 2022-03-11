export const CHART_CONFIG = {
    options: {
      timeScale: {
        secondsVisible: true,
        barSpacing: 3,
        rightBarStaysOnScroll: true,
        borderVisible: true,
        borderColor: '#fff000',
        visible: true,
      },
      layout: {
        backgroundColor: '#1A202C',
        textColor: 'white',
        fontSize: 12,
      },
      crosshair: {
        vertLine: {
            color: 'white',
            width: 1,
            style: 1,
            visible: true,
            labelVisible: false,
        },
        horzLine: {
            color: 'white',
            width: 1,
            style: 0,
            visible: true,
            labelVisible: true,
        },
        mode: 1,
      },
      grid: {
        vertLines: {
            color: 'rgba(70, 130, 180, 0.5)',
            style: 1,
            visible: true,
        },
        horzLines: {
            color: 'rgba(70, 130, 180, 0.5)',
            style: 1,
            visible: true,
        },
      },
    },
  };