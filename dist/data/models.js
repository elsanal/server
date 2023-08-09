"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aboutCollection = exports.serviceCollection = exports.resumeCollection = exports.projectCollection = void 0;
var mongoose_1 = require("mongoose");
var schema_1 = require("./schema");
// Get reference of collections, 
var projectCollection = (0, mongoose_1.model)('Projects', schema_1.projectSchema);
exports.projectCollection = projectCollection;
var resumeCollection = (0, mongoose_1.model)('Resume', schema_1.resumeSchema);
exports.resumeCollection = resumeCollection;
var serviceCollection = (0, mongoose_1.model)('Service', schema_1.serviceSchema);
exports.serviceCollection = serviceCollection;
var aboutCollection = (0, mongoose_1.model)('About', schema_1.aboutSchema);
exports.aboutCollection = aboutCollection;
//# sourceMappingURL=models.js.map