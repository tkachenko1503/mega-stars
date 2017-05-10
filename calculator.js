$(function () {
    // controls
    var requestsControl = $('#requests');
    var conversionControl = $('#conversion');
    var requestCostControl = $('#requestCost');

    // result elements
    var salesResultElement = $('#salesResult');
    var profitResultElement = $('#profitResult');
    var orderCurrentCostElement = $('#currentCost');
    var orderDownCostElement = $('#downCost');

    // state vars
    var state = {
        raw: {
            requests: 0,
            conversion: 0,
            requestCost: 0
        },
        derived: {
            sales: 0,
            profitSales: 0,
            totalSales: 0,
            currentOrderCost: 0,
            profitOrderCost: 0
        }
    };

    // logic
    function updateSalesResults() {
        var requests = parseInt(requestsControl.val());
        var conversion = parseInt(conversionControl.val());

        if (isNaN(requests) || isNaN(conversion)) {
            return;
        }

        var remains = requests * 0.4;
        var realRequests = requests - remains;
        
        var sales = realRequests * (conversion / 100);
        var lostSales = remains * (conversion / 100);

        var outFlow = requests - (sales + lostSales);
        var boost = Math.round(outFlow * 0.02);

        var profitSales = lostSales + boost;

        state.raw.requests = requests;
        state.raw.conversion = conversion;
        state.derived.sales = sales;
        state.derived.profitSales = profitSales;
        state.derived.totalSales = sales + lostSales;

        updateViews();
    }

    function updateDownCostResults() {
        var requestCost = parseInt(requestCostControl.val());

        if (isNaN(requestCost)) {
            return;
        }

        var totalCost = requestCost * state.raw.requests;

        var currentOrderCost = totalCost / state.derived.totalSales;
        var totalProfitSales = state.derived.totalSales + state.derived.profitSales;
        var profitOrderCost = currentOrderCost - (totalCost / totalProfitSales);

        state.raw.requestCost = requestCost;
        state.derived.currentOrderCost = currentOrderCost;
        state.derived.profitOrderCost = profitOrderCost;

        updateViews();
    }

    // views
    function updateViews() {
        var sales = Math.round(state.derived.sales);
        var profitSales = Math.round(state.derived.profitSales);
        var currentOrderCost = Math.round(state.derived.currentOrderCost);
        var profitOrderCost = Math.round(state.derived.profitOrderCost);

        salesResultElement.html(sales);
        profitResultElement.html(profitSales);

        orderCurrentCostElement.html(currentOrderCost);
        orderDownCostElement.html(profitOrderCost);
    }

    // subscribe
    requestsControl.on('input', updateSalesResults);
    conversionControl.on('input', updateSalesResults);
    requestCostControl.on('input', updateDownCostResults);

    // init views
    updateViews();
});