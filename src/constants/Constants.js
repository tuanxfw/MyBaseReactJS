export const Config = {
    CODE: 9,
    MODE: process.env.REACT_APP_MODE,
    PUBLIC_URL: process.env.PUBLIC_URL,
    URL_API: process.env.REACT_APP_URL_API,
};

export const App = {
    DATATABLE: {
        PAGE_SIZE_OPTIONS: [10, 20, 50],
        PAGE_SIZE_DEFAULT: 10,
    },

    INPUT_PICKER: {
        DATE: ["DD/MM/YYYY", "DDMMYYYY", "D/MM/YYYY", "D/M/YYYY", "D/M/YY", "D/MM/YY", "DD/M/YYYY", "DD/M/YY", "DD/MM/YY"],
    },


    DATE_TIME_FORMAT: {
        TIME: "HH:mm:ss",
        DATE: "DD/MM/YYYY",
        DATE_TIME: "DD/MM/YYYY HH:mm:ss",
        WEEK: "WW",
        MONTH: "MM",
        QUARTER: "Q",
        YEAR: "YYYY",
    },

    REGEX: {
        EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        DATE: /^[0-9]{2}[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}$/g,
        URL: /^http[s]?:\/\/(www\.)?(.*)?\/?(.)*/i,
        FILE_NAME: /^[a-z0-9+áàạảãâấầậẩẫăắằặẳẵéèẹẻẽêếềệểễóòọỏõôốồộổỗơớờợởỡúùụủũưứừựửữíìịỉĩđýỳỵỷỹ_ --()]+\.[a-z]{3}/i,
    },

    NUMBER_FORMAT: {
        DECIMAL_SEPARATOR: ".",
        THOUSAND_SEPARATOR: ",",
    }
};

export const Action = {
    INSERT: "INSERT",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    VIEW: "VIEW"
};

export const Services = {
    TIMEOUT_REST_API: undefined,

    RESPONSE_CODE: {
        SUCCESS: "API-000",
        ERROR: "ERROR",
        EXCEPTION: "VALID-001",
        DUPLICATE: "VALID-002",
        NOT_FOUND: "VALID-003",
        INVALID_DATA: "VALID-004",
        MAX_LENGTH: "VALID-005",
        FOREIGN_KEY: "VALID-006",
        NULL_OBJ: "VALID-007"
    }
};

