/**
 * Dijkstra算法
 * 
 * @author wupanpan@baidu.com
 * @date 2014-03-26
 */

/**
 * @const
 */
var POS_INFINITY = Infinity;

/**
 * @param {number} sourceV 源点的索引，从0开始
 * @param {Array} adjMatrix 图的邻接矩阵，是一个二维数组
 */

function dijkstra(sourceV, adjMatrix) {
    var set = [],
        path = [],
        
        dist = [];
        distCopy = [],
        vertexNum = adjMatrix.length;

    var temp, u,
        count = 0;

    // 初始化
    for (var i = 0; i < vertexNum; i++) {
        distCopy[i] = dist[i] = POS_INFINITY;
        set[i] = false;
    }
    distCopy[sourceV] = dist[sourceV] = 0;

    while (count < vertexNum) {
        u = distCopy.indexOf(Math.min.apply(Math, distCopy));
        set[u] = true;
        distCopy[u] = POS_INFINITY;

        for (var i = 0; i < vertexNum; i++) {
            if (!set[i] && ((temp = dist[u] + adjMatrix[u][i]) < dist[i])) {
                distCopy[i] = dist[i] = temp;
                path[i] = u;
            }
        }
        count++;
    }

    return {
        path: path,
        dist: dist
    };
}

/**
 * @param {number} v 源点索引, 从0开始
 * @param {number} d 非源点索引, 从0开始
 * @param {Array} adjMatrix 图的邻接矩阵，是一个二维数组
 */
function searchPath(v, d, adjMatrix) {
    var graph = dijkstra(v, adjMatrix),
        path = graph.path,
        dist = graph.dist;

    var prev = path[d],
        queue = [],
        str = '';
    
    queue.push(d);
    while(prev != v) {
        queue.push(prev);
        prev = path[prev];
    }
    queue.push(v);

    for (var j = queue.length - 1; j >= 0; j--) {
        str += queue.pop() + ' -> ';
    }
    console.log(str);
}


/**
 * 测试数据
 */
var adjM = [
    [0, 4, 2, POS_INFINITY, POS_INFINITY, POS_INFINITY],
    [4, 0, 1, 5, POS_INFINITY, POS_INFINITY],
    [2, 1, 0, 8, 10, POS_INFINITY],
    [POS_INFINITY, 5, 8, 0, 2, 6],
    [POS_INFINITY, POS_INFINITY, 10, 2, 0, 3],
    [POS_INFINITY, POS_INFINITY, POS_INFINITY, 6, 3, 0]
];
// var adjM = [
//     [0, 10, POS_INFINITY, 30, 100],
//     [10, 0, 50, POS_INFINITY, POS_INFINITY],
//     [POS_INFINITY, 50, 0, 20, 10],
//     [30, POS_INFINITY, 20, 0, 60],
//     [100, POS_INFINITY, 10, 60, 0]
// ];

searchPath(0, adjM.length - 1, adjM);