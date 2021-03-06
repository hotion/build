Tea.context(function () {
    this.advancedVisible = false;

	this.$delay(function () {
		this.$find("form input[name='name']").focus();
	});

    // life
    if (this.policy.life == "0s") {
        this.life = "";
        this.lifeUnit = "s";
    } else {
        this.life = this.policy.life.substring(0, this.policy.life.length - 1);
        this.lifeUnit = this.policy.life[this.policy.life.length - 1];
    }

    // max size
    if (this.policy.maxSize.length > 0 && this.policy.maxSize != "0.00m") {
        this.maxSize = this.policy.maxSize.substring(0, this.policy.maxSize.length - 1);
        this.maxSizeUnit = this.policy.maxSize[this.policy.maxSize.length - 1];
    } else {
        this.maxSize = "";
        this.maxSizeUnit = "m";
    }

    // capacity
    if (this.policy.capacity.length > 0 && this.policy.capacity != "0.00g") {
        this.capacity = this.policy.capacity.substring(0, this.policy.capacity.length - 1);
        this.capacityUnit = this.policy.capacity[this.policy.capacity.length - 1];
    } else {
        this.capacity = "";
        this.capacityUnit = "g";
    }

    /**
     * key
     */
    var that = this;
    this.formatKey = function () {
        var key = that.policy.key;
        key = key.replace(/\${(.+?)}/g, "${<a>$1</a>}");
        return key;
    };

    /**
     * 状态管理
     */
    this.statusList = this.policy.status;

    this.statusAdding = false;
    this.addingStatus = "";

    this.addStatus = function () {
        this.statusAdding = true;
        this.$delay(function () {
            this.$find("form input[name='addingStatus']").focus();
        });
    };

    this.cancelAdding = function () {
        this.statusAdding = false;
    };

    this.addStatusConfirm = function (e) {
        if (this.addingStatus.length != 3) {
            alert("状态码必须是3位数字");
            this.$find("form input[name='addingStatus']").focus();
            return;
        }
        if (this.statusList.$contains(this.addingStatus)) {
            alert("状态码已存在");
            this.$find("form input[name='addingStatus']").focus();
            return;
        }
        this.statusList.push(this.addingStatus);
        this.statusAdding = false;
        this.addingStatus = "";

        return false;
    };

    this.deleteStatus = function (index) {
        this.statusList.$remove(index);
    };

    /**
     * 类型
     */
    this.cacheType = this.policy.type;

    this.showAdvanced = function (b) {
        this.advancedVisible = b;
    };

    /**
     * Redis
     */
    this.optionsNetwork = "tcp";
    if (this.policy.options.network) {
        this.optionsNetwork = this.policy.options.network;
    }
});