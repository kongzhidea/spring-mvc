function initBtn(t, e) {
    var i = t;
    $("#invoice-td-" + i).show(), $("#invoice-btn-cancel-" + i).on("click", function () {
        $("#invoice-td-" + i).css("display", "none"), $("#invoice-form-" + i + " input[type='input']").val(""), $("#invoice-form-" + i + " em").html("")
    }), $("#invoice-btn-sure-" + i).on("click", function () {
        if (validateInvoiceForm(i, e)) {
            var t = $("#invoice-form-" + i).data("action");
            $.ajax({
                url: t,
                type: "post",
                context: "application/json",
                data: {invoice_num: $("#invoice-num-" + i).val()},
                success: function (t) {
                    t.ok && window.location.reload()
                },
                error: function () {
                    alert("Network error.")
                }
            })
        }
    })
}
function validateInvoiceForm(t, e) {
    var i = "";
    return "apply" == e ? i = "<span>\u53d1\u7968\u53f7\u4e0d\u80fd\u4e3a\u7a7a</span>" : "invoiced" == e && (i = "<span>\u5feb\u9012\u5355\u53f7\u4e0d\u80fd\u4e3a\u7a7a</span>"), $("#invoice-form-" + t).validate({
        focusCleanup: !0,
        errorElement: "em",
        errorClass: "invoice_form_error",
        rules: {invoice_num: {required: !0}},
        messages: {invoice_num: {required: i, digits: "\u8bf7\u8f93\u5165\u5355\u53f7"}},
        errorPlacement: function (t, e) {
            t.appendTo(e.parent())
        }
    }).form()
}
!function (t, e) {
    t.rails !== e && t.error("jquery-ujs has already been loaded!");
    var i, n = t(document);
    t.rails = i = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]",
        buttonClickSelector: "button[data-remote]:not(form button), button[data-confirm]:not(form button)",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
        disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
        fileInputSelector: "input[type=file]",
        linkDisableSelector: "a[data-disable-with], a[data-disable]",
        buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
        CSRFProtection: function (e) {
            var i = t('meta[name="csrf-token"]').attr("content");
            i && e.setRequestHeader("X-CSRF-Token", i)
        },
        refreshCSRFTokens: function () {
            var e = t("meta[name=csrf-token]").attr("content"), i = t("meta[name=csrf-param]").attr("content");
            t('form input[name="' + i + '"]').val(e)
        },
        fire: function (e, i, n) {
            var a = t.Event(i);
            return e.trigger(a, n), a.result !== !1
        },
        confirm: function (t) {
            return confirm(t)
        },
        ajax: function (e) {
            return t.ajax(e)
        },
        href: function (t) {
            return t.attr("href")
        },
        handleRemote: function (n) {
            var a, r, s, o, d, l, u, c;
            if (i.fire(n, "ajax:before")) {
                if (o = n.data("cross-domain"), d = o === e ? null : o, l = n.data("with-credentials") || null, u = n.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, n.is("form")) {
                    a = n.attr("method"), r = n.attr("action"), s = n.serializeArray();
                    var h = n.data("ujs:submit-button");
                    h && (s.push(h), n.data("ujs:submit-button", null))
                } else n.is(i.inputChangeSelector) ? (a = n.data("method"), r = n.data("url"), s = n.serialize(), n.data("params") && (s = s + "&" + n.data("params"))) : n.is(i.buttonClickSelector) ? (a = n.data("method") || "get", r = n.data("url"), s = n.serialize(), n.data("params") && (s = s + "&" + n.data("params"))) : (a = n.data("method"), r = i.href(n), s = n.data("params") || null);
                return c = {
                    type: a || "GET", data: s, dataType: u, beforeSend: function (t, a) {
                        return a.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + a.accepts.script), i.fire(n, "ajax:beforeSend", [t, a]) ? void n.trigger("ajax:send", t) : !1
                    }, success: function (t, e, i) {
                        n.trigger("ajax:success", [t, e, i])
                    }, complete: function (t, e) {
                        n.trigger("ajax:complete", [t, e])
                    }, error: function (t, e, i) {
                        n.trigger("ajax:error", [t, e, i])
                    }, crossDomain: d
                }, l && (c.xhrFields = {withCredentials: l}), r && (c.url = r), i.ajax(c)
            }
            return !1
        },
        handleMethod: function (n) {
            var a = i.href(n), r = n.data("method"), s = n.attr("target"), o = t("meta[name=csrf-token]").attr("content"), d = t("meta[name=csrf-param]").attr("content"), l = t('<form method="post" action="' + a + '"></form>'), u = '<input name="_method" value="' + r + '" type="hidden" />';
            d !== e && o !== e && (u += '<input name="' + d + '" value="' + o + '" type="hidden" />'), s && l.attr("target", s), l.hide().append(u).appendTo("body"), l.submit()
        },
        formElements: function (e, i) {
            return e.is("form") ? t(e[0].elements).filter(i) : e.find(i)
        },
        disableFormElements: function (e) {
            i.formElements(e, i.disableSelector).each(function () {
                i.disableFormElement(t(this))
            })
        },
        disableFormElement: function (t) {
            var i, n;
            i = t.is("button") ? "html" : "val", n = t.data("disable-with"), t.data("ujs:enable-with", t[i]()), n !== e && t[i](n), t.prop("disabled", !0)
        },
        enableFormElements: function (e) {
            i.formElements(e, i.enableSelector).each(function () {
                i.enableFormElement(t(this))
            })
        },
        enableFormElement: function (t) {
            var e = t.is("button") ? "html" : "val";
            t.data("ujs:enable-with") && t[e](t.data("ujs:enable-with")), t.prop("disabled", !1)
        },
        allowAction: function (t) {
            var e, n = t.data("confirm"), a = !1;
            return n ? (i.fire(t, "confirm") && (a = i.confirm(n), e = i.fire(t, "confirm:complete", [a])), a && e) : !0
        },
        blankInputs: function (e, i, n) {
            var a, r, s = t(), o = i || "input,textarea", d = e.find(o);
            return d.each(function () {
                if (a = t(this), r = a.is("input[type=checkbox],input[type=radio]") ? a.is(":checked") : a.val(), !r == !n) {
                    if (a.is("input[type=radio]") && d.filter('input[type=radio]:checked[name="' + a.attr("name") + '"]').length)return !0;
                    s = s.add(a)
                }
            }), s.length ? s : !1
        },
        nonBlankInputs: function (t, e) {
            return i.blankInputs(t, e, !0)
        },
        stopEverything: function (e) {
            return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), !1
        },
        disableElement: function (t) {
            var n = t.data("disable-with");
            t.data("ujs:enable-with", t.html()), n !== e && t.html(n), t.bind("click.railsDisable", function (t) {
                return i.stopEverything(t)
            })
        },
        enableElement: function (t) {
            t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), t.unbind("click.railsDisable")
        }
    }, i.fire(n, "rails:attachBindings") && (t.ajaxPrefilter(function (t, e, n) {
        t.crossDomain || i.CSRFProtection(n)
    }), n.delegate(i.linkDisableSelector, "ajax:complete", function () {
        i.enableElement(t(this))
    }), n.delegate(i.buttonDisableSelector, "ajax:complete", function () {
        i.enableFormElement(t(this))
    }), n.delegate(i.linkClickSelector, "click.rails", function (n) {
        var a = t(this), r = a.data("method"), s = a.data("params"), o = n.metaKey || n.ctrlKey;
        if (!i.allowAction(a))return i.stopEverything(n);
        if (!o && a.is(i.linkDisableSelector) && i.disableElement(a), a.data("remote") !== e) {
            if (o && (!r || "GET" === r) && !s)return !0;
            var d = i.handleRemote(a);
            return d === !1 ? i.enableElement(a) : d.error(function () {
                i.enableElement(a)
            }), !1
        }
        return a.data("method") ? (i.handleMethod(a), !1) : void 0
    }), n.delegate(i.buttonClickSelector, "click.rails", function (e) {
        var n = t(this);
        if (!i.allowAction(n))return i.stopEverything(e);
        n.is(i.buttonDisableSelector) && i.disableFormElement(n);
        var a = i.handleRemote(n);
        return a === !1 ? i.enableFormElement(n) : a.error(function () {
            i.enableFormElement(n)
        }), !1
    }), n.delegate(i.inputChangeSelector, "change.rails", function (e) {
        var n = t(this);
        return i.allowAction(n) ? (i.handleRemote(n), !1) : i.stopEverything(e)
    }), n.delegate(i.formSubmitSelector, "submit.rails", function (n) {
        var a, r, s = t(this), o = s.data("remote") !== e;
        if (!i.allowAction(s))return i.stopEverything(n);
        if (s.attr("novalidate") == e && (a = i.blankInputs(s, i.requiredInputSelector), a && i.fire(s, "ajax:aborted:required", [a])))return i.stopEverything(n);
        if (o) {
            if (r = i.nonBlankInputs(s, i.fileInputSelector)) {
                setTimeout(function () {
                    i.disableFormElements(s)
                }, 13);
                var d = i.fire(s, "ajax:aborted:file", [r]);
                return d || setTimeout(function () {
                    i.enableFormElements(s)
                }, 13), d
            }
            return i.handleRemote(s), !1
        }
        setTimeout(function () {
            i.disableFormElements(s)
        }, 13)
    }), n.delegate(i.formInputClickSelector, "click.rails", function (e) {
        var n = t(this);
        if (!i.allowAction(n))return i.stopEverything(e);
        var a = n.attr("name"), r = a ? {name: a, value: n.val()} : null;
        n.closest("form").data("ujs:submit-button", r)
    }), n.delegate(i.formSubmitSelector, "ajax:send.rails", function (e) {
        this == e.target && i.disableFormElements(t(this))
    }), n.delegate(i.formSubmitSelector, "ajax:complete.rails", function (e) {
        this == e.target && i.enableFormElements(t(this))
    }), t(function () {
        i.refreshCSRFTokens()
    }))
}(jQuery), /*!
 * jQuery Validation Plugin v1.12.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2014 Jörn Zaefferer
 * Released under the MIT license
 */
    function (t) {
        t.extend(t.fn, {
            validate: function (e) {
                if (!this.length)return void(e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
                var i = t.data(this[0], "validator");
                return i ? i : (this.attr("novalidate", "novalidate"), i = new t.validator(e, this[0]), t.data(this[0], "validator", i), i.settings.onsubmit && (this.validateDelegate(":submit", "click", function (e) {
                    i.settings.submitHandler && (i.submitButton = e.target), t(e.target).hasClass("cancel") && (i.cancelSubmit = !0), void 0 !== t(e.target).attr("formnovalidate") && (i.cancelSubmit = !0)
                }), this.submit(function (e) {
                    function n() {
                        var n;
                        return i.settings.submitHandler ? (i.submitButton && (n = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)), i.settings.submitHandler.call(i, i.currentForm, e), i.submitButton && n.remove(), !1) : !0
                    }

                    return i.settings.debug && e.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, n()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : n() : (i.focusInvalid(), !1)
                })), i)
            }, valid: function () {
                var e, i;
                return t(this[0]).is("form") ? e = this.validate().form() : (e = !0, i = t(this[0].form).validate(), this.each(function () {
                    e = i.element(this) && e
                })), e
            }, removeAttrs: function (e) {
                var i = {}, n = this;
                return t.each(e.split(/\s/), function (t, e) {
                    i[e] = n.attr(e), n.removeAttr(e)
                }), i
            }, rules: function (e, i) {
                var n, a, r, s, o, d, l = this[0];
                if (e)switch (n = t.data(l.form, "validator").settings, a = n.rules, r = t.validator.staticRules(l), e) {
                    case"add":
                        t.extend(r, t.validator.normalizeRule(i)), delete r.messages, a[l.name] = r, i.messages && (n.messages[l.name] = t.extend(n.messages[l.name], i.messages));
                        break;
                    case"remove":
                        return i ? (d = {}, t.each(i.split(/\s/), function (e, i) {
                            d[i] = r[i], delete r[i], "required" === i && t(l).removeAttr("aria-required")
                        }), d) : (delete a[l.name], r)
                }
                return s = t.validator.normalizeRules(t.extend({}, t.validator.classRules(l), t.validator.attributeRules(l), t.validator.dataRules(l), t.validator.staticRules(l)), l), s.required && (o = s.required, delete s.required, s = t.extend({required: o}, s), t(l).attr("aria-required", "true")), s.remote && (o = s.remote, delete s.remote, s = t.extend(s, {remote: o})), s
            }
        }), t.extend(t.expr[":"], {
            blank: function (e) {
                return !t.trim("" + t(e).val())
            }, filled: function (e) {
                return !!t.trim("" + t(e).val())
            }, unchecked: function (e) {
                return !t(e).prop("checked")
            }
        }), t.validator = function (e, i) {
            this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = i, this.init()
        }, t.validator.format = function (e, i) {
            return 1 === arguments.length ? function () {
                var i = t.makeArray(arguments);
                return i.unshift(e), t.validator.format.apply(this, i)
            } : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), t.each(i, function (t, i) {
                e = e.replace(new RegExp("\\{" + t + "\\}", "g"), function () {
                    return i
                })
            }), e)
        }, t.extend(t.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                validClass: "valid",
                errorElement: "label",
                focusInvalid: !0,
                errorContainer: t([]),
                errorLabelContainer: t([]),
                onsubmit: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                onfocusin: function (t) {
                    this.lastActive = t, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(t)).hide())
                },
                onfocusout: function (t) {
                    this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
                },
                onkeyup: function (t, e) {
                    (9 !== e.which || "" !== this.elementValue(t)) && (t.name in this.submitted || t === this.lastElement) && this.element(t)
                },
                onclick: function (t) {
                    t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
                },
                highlight: function (e, i, n) {
                    "radio" === e.type ? this.findByName(e.name).addClass(i).removeClass(n) : t(e).addClass(i).removeClass(n)
                },
                unhighlight: function (e, i, n) {
                    "radio" === e.type ? this.findByName(e.name).removeClass(i).addClass(n) : t(e).removeClass(i).addClass(n)
                }
            },
            setDefaults: function (e) {
                t.extend(t.validator.defaults, e)
            },
            messages: {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                creditcard: "Please enter a valid credit card number.",
                equalTo: "Please enter the same value again.",
                maxlength: t.validator.format("Please enter no more than {0} characters."),
                minlength: t.validator.format("Please enter at least {0} characters."),
                rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
                range: t.validator.format("Please enter a value between {0} and {1}."),
                max: t.validator.format("Please enter a value less than or equal to {0}."),
                min: t.validator.format("Please enter a value greater than or equal to {0}.")
            },
            autoCreateRanges: !1,
            prototype: {
                init: function () {
                    function e(e) {
                        var i = t.data(this[0].form, "validator"), n = "on" + e.type.replace(/^validate/, ""), a = i.settings;
                        a[n] && !this.is(a.ignore) && a[n].call(i, this[0], e)
                    }

                    this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm), this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                    var i, n = this.groups = {};
                    t.each(this.settings.groups, function (e, i) {
                        "string" == typeof i && (i = i.split(/\s/)), t.each(i, function (t, i) {
                            n[i] = e
                        })
                    }), i = this.settings.rules, t.each(i, function (e, n) {
                        i[e] = t.validator.normalizeRule(n)
                    }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", e).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", e), this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler), t(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
                }, form: function () {
                    return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap), this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                }, checkForm: function () {
                    this.prepareForm();
                    for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++)this.check(e[t]);
                    return this.valid()
                }, element: function (e) {
                    var i = this.clean(e), n = this.validationTargetFor(i), a = !0;
                    return this.lastElement = n, void 0 === n ? delete this.invalid[i.name] : (this.prepareElement(n), this.currentElements = t(n), a = this.check(n) !== !1, a ? delete this.invalid[n.name] : this.invalid[n.name] = !0), t(e).attr("aria-invalid", !a), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), a
                }, showErrors: function (e) {
                    if (e) {
                        t.extend(this.errorMap, e), this.errorList = [];
                        for (var i in e)this.errorList.push({message: e[i], element: this.findByName(i)[0]});
                        this.successList = t.grep(this.successList, function (t) {
                            return !(t.name in e)
                        })
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                }, resetForm: function () {
                    t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
                }, numberOfInvalids: function () {
                    return this.objectLength(this.invalid)
                }, objectLength: function (t) {
                    var e, i = 0;
                    for (e in t)i++;
                    return i
                }, hideErrors: function () {
                    this.addWrapper(this.toHide).hide()
                }, valid: function () {
                    return 0 === this.size()
                }, size: function () {
                    return this.errorList.length
                }, focusInvalid: function () {
                    if (this.settings.focusInvalid)try {
                        t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (e) {
                    }
                }, findLastActive: function () {
                    var e = this.lastActive;
                    return e && 1 === t.grep(this.errorList, function (t) {
                            return t.element.name === e.name
                        }).length && e
                }, elements: function () {
                    var e = this, i = {};
                    return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                        return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in i || !e.objectLength(t(this).rules()) ? !1 : (i[this.name] = !0, !0)
                    })
                }, clean: function (e) {
                    return t(e)[0]
                }, errors: function () {
                    var e = this.settings.errorClass.split(" ").join(".");
                    return t(this.settings.errorElement + "." + e, this.errorContext)
                }, reset: function () {
                    this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]), this.currentElements = t([])
                }, prepareForm: function () {
                    this.reset(), this.toHide = this.errors().add(this.containers)
                }, prepareElement: function (t) {
                    this.reset(), this.toHide = this.errorsFor(t)
                }, elementValue: function (e) {
                    var i, n = t(e), a = n.attr("type");
                    return "radio" === a || "checkbox" === a ? t("input[name='" + n.attr("name") + "']:checked").val() : (i = n.val(), "string" == typeof i ? i.replace(/\r/g, "") : i)
                }, check: function (e) {
                    e = this.validationTargetFor(this.clean(e));
                    var i, n, a, r = t(e).rules(), s = t.map(r, function (t, e) {
                        return e
                    }).length, o = !1, d = this.elementValue(e);
                    for (n in r) {
                        a = {method: n, parameters: r[n]};
                        try {
                            if (i = t.validator.methods[n].call(this, d, e, a.parameters), "dependency-mismatch" === i && 1 === s) {
                                o = !0;
                                continue
                            }
                            if (o = !1, "pending" === i)return void(this.toHide = this.toHide.not(this.errorsFor(e)));
                            if (!i)return this.formatAndAdd(e, a), !1
                        } catch (l) {
                            throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + a.method + "' method.", l), l
                        }
                    }
                    if (!o)return this.objectLength(r) && this.successList.push(e), !0
                }, customDataMessage: function (e, i) {
                    return t(e).data("msg" + i[0].toUpperCase() + i.substring(1).toLowerCase()) || t(e).data("msg")
                }, customMessage: function (t, e) {
                    var i = this.settings.messages[t];
                    return i && (i.constructor === String ? i : i[e])
                }, findDefined: function () {
                    for (var t = 0; t < arguments.length; t++)if (void 0 !== arguments[t])return arguments[t];
                    return void 0
                }, defaultMessage: function (e, i) {
                    return this.findDefined(this.customMessage(e.name, i), this.customDataMessage(e, i), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[i], "<strong>Warning: No message defined for " + e.name + "</strong>")
                }, formatAndAdd: function (e, i) {
                    var n = this.defaultMessage(e, i.method), a = /\$?\{(\d+)\}/g;
                    "function" == typeof n ? n = n.call(this, i.parameters, e) : a.test(n) && (n = t.validator.format(n.replace(a, "{$1}"), i.parameters)), this.errorList.push({
                        message: n,
                        element: e,
                        method: i.method
                    }), this.errorMap[e.name] = n, this.submitted[e.name] = n
                }, addWrapper: function (t) {
                    return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t
                }, defaultShowErrors: function () {
                    var t, e, i;
                    for (t = 0; this.errorList[t]; t++)i = this.errorList[t], this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass), this.showLabel(i.element, i.message);
                    if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)for (t = 0; this.successList[t]; t++)this.showLabel(this.successList[t]);
                    if (this.settings.unhighlight)for (t = 0, e = this.validElements(); e[t]; t++)this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                    this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                }, validElements: function () {
                    return this.currentElements.not(this.invalidElements())
                }, invalidElements: function () {
                    return t(this.errorList).map(function () {
                        return this.element
                    })
                }, showLabel: function (e, i) {
                    var n = this.errorsFor(e);
                    n.length ? (n.removeClass(this.settings.validClass).addClass(this.settings.errorClass), n.html(i)) : (n = t("<" + this.settings.errorElement + ">").attr("for", this.idOrName(e)).addClass(this.settings.errorClass).html(i || ""), this.settings.wrapper && (n = n.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(n).length || (this.settings.errorPlacement ? this.settings.errorPlacement(n, t(e)) : n.insertAfter(e))), !i && this.settings.success && (n.text(""), "string" == typeof this.settings.success ? n.addClass(this.settings.success) : this.settings.success(n, e)), this.toShow = this.toShow.add(n)
                }, errorsFor: function (e) {
                    var i = this.idOrName(e);
                    return this.errors().filter(function () {
                        return t(this).attr("for") === i
                    })
                }, idOrName: function (t) {
                    return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name)
                }, validationTargetFor: function (t) {
                    return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]), t
                }, checkable: function (t) {
                    return /radio|checkbox/i.test(t.type)
                }, findByName: function (e) {
                    return t(this.currentForm).find("[name='" + e + "']")
                }, getLength: function (e, i) {
                    switch (i.nodeName.toLowerCase()) {
                        case"select":
                            return t("option:selected", i).length;
                        case"input":
                            if (this.checkable(i))return this.findByName(i.name).filter(":checked").length
                    }
                    return e.length
                }, depend: function (t, e) {
                    return this.dependTypes[typeof t] ? this.dependTypes[typeof t](t, e) : !0
                }, dependTypes: {
                    "boolean": function (t) {
                        return t
                    }, string: function (e, i) {
                        return !!t(e, i.form).length
                    }, "function": function (t, e) {
                        return t(e)
                    }
                }, optional: function (e) {
                    var i = this.elementValue(e);
                    return !t.validator.methods.required.call(this, i, e) && "dependency-mismatch"
                }, startRequest: function (t) {
                    this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0)
                }, stopRequest: function (e, i) {
                    this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name], i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                }, previousValue: function (e) {
                    return t.data(e, "previousValue") || t.data(e, "previousValue", {
                            old: null,
                            valid: !0,
                            message: this.defaultMessage(e, "remote")
                        })
                }
            },
            classRuleSettings: {
                required: {required: !0},
                email: {email: !0},
                url: {url: !0},
                date: {date: !0},
                dateISO: {dateISO: !0},
                number: {number: !0},
                digits: {digits: !0},
                creditcard: {creditcard: !0}
            },
            addClassRules: function (e, i) {
                e.constructor === String ? this.classRuleSettings[e] = i : t.extend(this.classRuleSettings, e)
            },
            classRules: function (e) {
                var i = {}, n = t(e).attr("class");
                return n && t.each(n.split(" "), function () {
                    this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this])
                }), i
            },
            attributeRules: function (e) {
                var i, n, a = {}, r = t(e), s = e.getAttribute("type");
                for (i in t.validator.methods)"required" === i ? (n = e.getAttribute(i), "" === n && (n = !0), n = !!n) : n = r.attr(i), /min|max/.test(i) && (null === s || /number|range|text/.test(s)) && (n = Number(n)), n || 0 === n ? a[i] = n : s === i && "range" !== s && (a[i] = !0);
                return a.maxlength && /-1|2147483647|524288/.test(a.maxlength) && delete a.maxlength, a
            },
            dataRules: function (e) {
                var i, n, a = {}, r = t(e);
                for (i in t.validator.methods)n = r.data("rule" + i[0].toUpperCase() + i.substring(1).toLowerCase()), void 0 !== n && (a[i] = n);
                return a
            },
            staticRules: function (e) {
                var i = {}, n = t.data(e.form, "validator");
                return n.settings.rules && (i = t.validator.normalizeRule(n.settings.rules[e.name]) || {}), i
            },
            normalizeRules: function (e, i) {
                return t.each(e, function (n, a) {
                    if (a === !1)return void delete e[n];
                    if (a.param || a.depends) {
                        var r = !0;
                        switch (typeof a.depends) {
                            case"string":
                                r = !!t(a.depends, i.form).length;
                                break;
                            case"function":
                                r = a.depends.call(i, i)
                        }
                        r ? e[n] = void 0 !== a.param ? a.param : !0 : delete e[n]
                    }
                }), t.each(e, function (n, a) {
                    e[n] = t.isFunction(a) ? a(i) : a
                }), t.each(["minlength", "maxlength"], function () {
                    e[this] && (e[this] = Number(e[this]))
                }), t.each(["rangelength", "range"], function () {
                    var i;
                    e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (i = e[this].split(/[\s,]+/), e[this] = [Number(i[0]), Number(i[1])]))
                }), t.validator.autoCreateRanges && (e.min && e.max && (e.range = [e.min, e.max], delete e.min, delete e.max), e.minlength && e.maxlength && (e.rangelength = [e.minlength, e.maxlength], delete e.minlength, delete e.maxlength)), e
            },
            normalizeRule: function (e) {
                if ("string" == typeof e) {
                    var i = {};
                    t.each(e.split(/\s/), function () {
                        i[this] = !0
                    }), e = i
                }
                return e
            },
            addMethod: function (e, i, n) {
                t.validator.methods[e] = i, t.validator.messages[e] = void 0 !== n ? n : t.validator.messages[e], i.length < 3 && t.validator.addClassRules(e, t.validator.normalizeRule(e))
            },
            methods: {
                required: function (e, i, n) {
                    if (!this.depend(n, i))return "dependency-mismatch";
                    if ("select" === i.nodeName.toLowerCase()) {
                        var a = t(i).val();
                        return a && a.length > 0
                    }
                    return this.checkable(i) ? this.getLength(e, i) > 0 : t.trim(e).length > 0
                }, email: function (t, e) {
                    return this.optional(e) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)
                }, url: function (t, e) {
                    return this.optional(e) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
                }, date: function (t, e) {
                    return this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString())
                }, dateISO: function (t, e) {
                    return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t)
                }, number: function (t, e) {
                    return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
                }, digits: function (t, e) {
                    return this.optional(e) || /^\d+$/.test(t)
                }, creditcard: function (t, e) {
                    if (this.optional(e))return "dependency-mismatch";
                    if (/[^0-9 \-]+/.test(t))return !1;
                    var i, n, a = 0, r = 0, s = !1;
                    if (t = t.replace(/\D/g, ""), t.length < 13 || t.length > 19)return !1;
                    for (i = t.length - 1; i >= 0; i--)n = t.charAt(i), r = parseInt(n, 10), s && (r *= 2) > 9 && (r -= 9), a += r, s = !s;
                    return a % 10 === 0
                }, minlength: function (e, i, n) {
                    var a = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                    return this.optional(i) || a >= n
                }, maxlength: function (e, i, n) {
                    var a = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                    return this.optional(i) || n >= a
                }, rangelength: function (e, i, n) {
                    var a = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                    return this.optional(i) || a >= n[0] && a <= n[1]
                }, min: function (t, e, i) {
                    return this.optional(e) || t >= i
                }, max: function (t, e, i) {
                    return this.optional(e) || i >= t
                }, range: function (t, e, i) {
                    return this.optional(e) || t >= i[0] && t <= i[1]
                }, equalTo: function (e, i, n) {
                    var a = t(n);
                    return this.settings.onfocusout && a.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                        t(i).valid()
                    }), e === a.val()
                }, remote: function (e, i, n) {
                    if (this.optional(i))return "dependency-mismatch";
                    var a, r, s = this.previousValue(i);
                    return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), s.originalMessage = this.settings.messages[i.name].remote, this.settings.messages[i.name].remote = s.message, n = "string" == typeof n && {url: n} || n, s.old === e ? s.valid : (s.old = e, a = this, this.startRequest(i), r = {}, r[i.name] = e, t.ajax(t.extend(!0, {
                        url: n,
                        mode: "abort",
                        port: "validate" + i.name,
                        dataType: "json",
                        data: r,
                        context: a.currentForm,
                        success: function (n) {
                            var r, o, d, l = n === !0 || "true" === n;
                            a.settings.messages[i.name].remote = s.originalMessage, l ? (d = a.formSubmitted, a.prepareElement(i), a.formSubmitted = d, a.successList.push(i), delete a.invalid[i.name], a.showErrors()) : (r = {}, o = n || a.defaultMessage(i, "remote"), r[i.name] = s.message = t.isFunction(o) ? o(e) : o, a.invalid[i.name] = !0, a.showErrors(r)), s.valid = l, a.stopRequest(i, l)
                        }
                    }, n)), "pending")
                }
            }
        }), t.format = function () {
            throw"$.format has been deprecated. Please use $.validator.format instead."
        }
    }(jQuery), function (t) {
    var e, i = {};
    t.ajaxPrefilter ? t.ajaxPrefilter(function (t, e, n) {
        var a = t.port;
        "abort" === t.mode && (i[a] && i[a].abort(), i[a] = n)
    }) : (e = t.ajax, t.ajax = function (n) {
        var a = ("mode"in n ? n : t.ajaxSettings).mode, r = ("port"in n ? n : t.ajaxSettings).port;
        return "abort" === a ? (i[r] && i[r].abort(), i[r] = e.apply(this, arguments), i[r]) : e.apply(this, arguments)
    })
}(jQuery), function (t) {
    t.extend(t.fn, {
        validateDelegate: function (e, i, n) {
            return this.bind(i, function (i) {
                var a = t(i.target);
                return a.is(e) ? n.apply(a, arguments) : void 0
            })
        }
    })
}(jQuery), /*!
 * jQuery Validation Plugin v1.12.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2014 Jörn Zaefferer
 * Released under the MIT license
 */
    function () {
        function t(t) {
            return t.replace(/<.[^<>]*?>/g, " ").replace(/&nbsp;|&#160;/gi, " ").replace(/[.(),;:!?%#$'\"_+=\/\-\u201c\u201d\u2019]*/g, "")
        }

        jQuery.validator.addMethod("maxWords", function (e, i, n) {
            return this.optional(i) || t(e).match(/\b\w+\b/g).length <= n
        }, jQuery.validator.format("Please enter {0} words or less.")), jQuery.validator.addMethod("minWords", function (e, i, n) {
            return this.optional(i) || t(e).match(/\b\w+\b/g).length >= n
        }, jQuery.validator.format("Please enter at least {0} words.")), jQuery.validator.addMethod("rangeWords", function (e, i, n) {
            var a = t(e), r = /\b\w+\b/g;
            return this.optional(i) || a.match(r).length >= n[0] && a.match(r).length <= n[1]
        }, jQuery.validator.format("Please enter between {0} and {1} words."))
    }(), jQuery.validator.addMethod("accept", function (t, e, i) {
    var n, a, r = "string" == typeof i ? i.replace(/\s/g, "").replace(/,/g, "|") : "image/*", s = this.optional(e);
    if (s)return s;
    if ("file" === jQuery(e).attr("type") && (r = r.replace(/\*/g, ".*"), e.files && e.files.length))for (n = 0; n < e.files.length; n++)if (a = e.files[n], !a.type.match(new RegExp(".?(" + r + ")$", "i")))return !1;
    return !0
}, jQuery.validator.format("Please enter a value with a valid mimetype.")), jQuery.validator.addMethod("alphanumeric", function (t, e) {
    return this.optional(e) || /^\w+$/i.test(t)
}, "Letters, numbers, and underscores only please"), jQuery.validator.addMethod("bankaccountNL", function (t, e) {
    if (this.optional(e))return !0;
    if (!/^[0-9]{9}|([0-9]{2} ){3}[0-9]{3}$/.test(t))return !1;
    var i, n, a, r = t.replace(/ /g, ""), s = 0, o = r.length;
    for (i = 0; o > i; i++)n = o - i, a = r.substring(i, i + 1), s += n * a;
    return s % 11 === 0
}, "Please specify a valid bank account number"), jQuery.validator.addMethod("bankorgiroaccountNL", function (t, e) {
    return this.optional(e) || $.validator.methods.bankaccountNL.call(this, t, e) || $.validator.methods.giroaccountNL.call(this, t, e)
}, "Please specify a valid bank or giro account number"), jQuery.validator.addMethod("bic", function (t, e) {
    return this.optional(e) || /^([A-Z]{6}[A-Z2-9][A-NP-Z1-2])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/.test(t)
}, "Please specify a valid BIC code"), jQuery.validator.addMethod("cifES", function (t) {
    "use strict";
    var e, i, n, a, r, s, o = [];
    if (t = t.toUpperCase(), !t.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)"))return !1;
    for (n = 0; 9 > n; n++)o[n] = parseInt(t.charAt(n), 10);
    for (i = o[2] + o[4] + o[6], a = 1; 8 > a; a += 2)r = (2 * o[a]).toString(), s = r.charAt(1), i += parseInt(r.charAt(0), 10) + ("" === s ? 0 : parseInt(s, 10));
    return /^[ABCDEFGHJNPQRSUVW]{1}/.test(t) ? (i += "", e = 10 - parseInt(i.charAt(i.length - 1), 10), t += e, o[8].toString() === String.fromCharCode(64 + e) || o[8].toString() === t.charAt(t.length - 1)) : !1
}, "Please specify a valid CIF number."), jQuery.validator.addMethod("creditcardtypes", function (t, e, i) {
    if (/[^0-9\-]+/.test(t))return !1;
    t = t.replace(/\D/g, "");
    var n = 0;
    return i.mastercard && (n |= 1), i.visa && (n |= 2), i.amex && (n |= 4), i.dinersclub && (n |= 8), i.enroute && (n |= 16), i.discover && (n |= 32), i.jcb && (n |= 64), i.unknown && (n |= 128), i.all && (n = 255), 1 & n && /^(5[12345])/.test(t) ? 16 === t.length : 2 & n && /^(4)/.test(t) ? 16 === t.length : 4 & n && /^(3[47])/.test(t) ? 15 === t.length : 8 & n && /^(3(0[012345]|[68]))/.test(t) ? 14 === t.length : 16 & n && /^(2(014|149))/.test(t) ? 15 === t.length : 32 & n && /^(6011)/.test(t) ? 16 === t.length : 64 & n && /^(3)/.test(t) ? 16 === t.length : 64 & n && /^(2131|1800)/.test(t) ? 15 === t.length : 128 & n ? !0 : !1
}, "Please enter a valid credit card number."), jQuery.validator.addMethod("currency", function (t, e, i) {
    var n, a = "string" == typeof i, r = a ? i : i[0], s = a ? !0 : i[1];
    return r = r.replace(/,/g, ""), r = s ? r + "]" : r + "]?", n = "^[" + r + "([1-9]{1}[0-9]{0,2}(\\,[0-9]{3})*(\\.[0-9]{0,2})?|[1-9]{1}[0-9]{0,}(\\.[0-9]{0,2})?|0(\\.[0-9]{0,2})?|(\\.[0-9]{1,2})?)$", n = new RegExp(n), this.optional(e) || n.test(t)
}, "Please specify a valid currency"), jQuery.validator.addMethod("dateITA", function (t, e) {
    var i, n, a, r, s, o = !1, d = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    return d.test(t) ? (i = t.split("/"), n = parseInt(i[0], 10), a = parseInt(i[1], 10), r = parseInt(i[2], 10), s = new Date(r, a - 1, n, 12, 0, 0, 0), o = s.getFullYear() === r && s.getMonth() === a - 1 && s.getDate() === n ? !0 : !1) : o = !1, this.optional(e) || o
}, "Please enter a correct date"), jQuery.validator.addMethod("dateNL", function (t, e) {
    return this.optional(e) || /^(0?[1-9]|[12]\d|3[01])[\.\/\-](0?[1-9]|1[012])[\.\/\-]([12]\d)?(\d\d)$/.test(t)
}, "Please enter a correct date"), jQuery.validator.addMethod("extension", function (t, e, i) {
    return i = "string" == typeof i ? i.replace(/,/g, "|") : "png|jpe?g|gif", this.optional(e) || t.match(new RegExp(".(" + i + ")$", "i"))
}, jQuery.validator.format("Please enter a value with a valid extension.")), jQuery.validator.addMethod("giroaccountNL", function (t, e) {
    return this.optional(e) || /^[0-9]{1,7}$/.test(t)
}, "Please specify a valid giro account number"), jQuery.validator.addMethod("iban", function (t, e) {
    if (this.optional(e))return !0;
    var i, n, a, r, s, o, d, l, u, c = t.replace(/ /g, "").toUpperCase(), h = "", p = !0, m = "", f = "";
    if (!/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(c))return !1;
    if (i = c.substring(0, 2), o = {
            AL: "\\d{8}[\\dA-Z]{16}",
            AD: "\\d{8}[\\dA-Z]{12}",
            AT: "\\d{16}",
            AZ: "[\\dA-Z]{4}\\d{20}",
            BE: "\\d{12}",
            BH: "[A-Z]{4}[\\dA-Z]{14}",
            BA: "\\d{16}",
            BR: "\\d{23}[A-Z][\\dA-Z]",
            BG: "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
            CR: "\\d{17}",
            HR: "\\d{17}",
            CY: "\\d{8}[\\dA-Z]{16}",
            CZ: "\\d{20}",
            DK: "\\d{14}",
            DO: "[A-Z]{4}\\d{20}",
            EE: "\\d{16}",
            FO: "\\d{14}",
            FI: "\\d{14}",
            FR: "\\d{10}[\\dA-Z]{11}\\d{2}",
            GE: "[\\dA-Z]{2}\\d{16}",
            DE: "\\d{18}",
            GI: "[A-Z]{4}[\\dA-Z]{15}",
            GR: "\\d{7}[\\dA-Z]{16}",
            GL: "\\d{14}",
            GT: "[\\dA-Z]{4}[\\dA-Z]{20}",
            HU: "\\d{24}",
            IS: "\\d{22}",
            IE: "[\\dA-Z]{4}\\d{14}",
            IL: "\\d{19}",
            IT: "[A-Z]\\d{10}[\\dA-Z]{12}",
            KZ: "\\d{3}[\\dA-Z]{13}",
            KW: "[A-Z]{4}[\\dA-Z]{22}",
            LV: "[A-Z]{4}[\\dA-Z]{13}",
            LB: "\\d{4}[\\dA-Z]{20}",
            LI: "\\d{5}[\\dA-Z]{12}",
            LT: "\\d{16}",
            LU: "\\d{3}[\\dA-Z]{13}",
            MK: "\\d{3}[\\dA-Z]{10}\\d{2}",
            MT: "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
            MR: "\\d{23}",
            MU: "[A-Z]{4}\\d{19}[A-Z]{3}",
            MC: "\\d{10}[\\dA-Z]{11}\\d{2}",
            MD: "[\\dA-Z]{2}\\d{18}",
            ME: "\\d{18}",
            NL: "[A-Z]{4}\\d{10}",
            NO: "\\d{11}",
            PK: "[\\dA-Z]{4}\\d{16}",
            PS: "[\\dA-Z]{4}\\d{21}",
            PL: "\\d{24}",
            PT: "\\d{21}",
            RO: "[A-Z]{4}[\\dA-Z]{16}",
            SM: "[A-Z]\\d{10}[\\dA-Z]{12}",
            SA: "\\d{2}[\\dA-Z]{18}",
            RS: "\\d{18}",
            SK: "\\d{20}",
            SI: "\\d{15}",
            ES: "\\d{20}",
            SE: "\\d{20}",
            CH: "\\d{5}[\\dA-Z]{12}",
            TN: "\\d{20}",
            TR: "\\d{5}[\\dA-Z]{17}",
            AE: "\\d{3}\\d{16}",
            GB: "[A-Z]{4}\\d{14}",
            VG: "[\\dA-Z]{4}\\d{16}"
        }, s = o[i], "undefined" != typeof s && (d = new RegExp("^[A-Z]{2}\\d{2}" + s + "$", ""), !d.test(c)))return !1;
    for (n = c.substring(4, c.length) + c.substring(0, 4), l = 0; l < n.length; l++)a = n.charAt(l), "0" !== a && (p = !1), p || (h += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(a));
    for (u = 0; u < h.length; u++)r = h.charAt(u), f = "" + m + r, m = f % 97;
    return 1 === m
}, "Please specify a valid IBAN"), jQuery.validator.addMethod("integer", function (t, e) {
    return this.optional(e) || /^-?\d+$/.test(t)
}, "A positive or negative non-decimal number please"), jQuery.validator.addMethod("ipv4", function (t, e) {
    return this.optional(e) || /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i.test(t)
}, "Please enter a valid IP v4 address."), jQuery.validator.addMethod("ipv6", function (t, e) {
    return this.optional(e) || /^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$/i.test(t)
}, "Please enter a valid IP v6 address."), jQuery.validator.addMethod("lettersonly", function (t, e) {
    return this.optional(e) || /^[a-z]+$/i.test(t)
}, "Letters only please"), jQuery.validator.addMethod("letterswithbasicpunc", function (t, e) {
    return this.optional(e) || /^[a-z\-.,()'"\s]+$/i.test(t)
}, "Letters or punctuation only please"), jQuery.validator.addMethod("mobileNL", function (t, e) {
    return this.optional(e) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)6((\s|\s?\-\s?)?[0-9]){8}$/.test(t)
}, "Please specify a valid mobile number"), jQuery.validator.addMethod("mobileUK", function (t, e) {
    return t = t.replace(/\(|\)|\s+|-/g, ""), this.optional(e) || t.length > 9 && t.match(/^(?:(?:(?:00\s?|\+)44\s?|0)7(?:[1345789]\d{2}|624)\s?\d{3}\s?\d{3})$/)
}, "Please specify a valid mobile number"), jQuery.validator.addMethod("nieES", function (t) {
    "use strict";
    return t = t.toUpperCase(), t.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)") ? /^[T]{1}/.test(t) ? t[8] === /^[T]{1}[A-Z0-9]{8}$/.test(t) : /^[XYZ]{1}/.test(t) ? t[8] === "TRWAGMYFPDXBNJZSQVHLCKE".charAt(t.replace("X", "0").replace("Y", "1").replace("Z", "2").substring(0, 8) % 23) : !1 : !1
}, "Please specify a valid NIE number."), jQuery.validator.addMethod("nifES", function (t) {
    "use strict";
    return t = t.toUpperCase(), t.match("((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)") ? /^[0-9]{8}[A-Z]{1}$/.test(t) ? "TRWAGMYFPDXBNJZSQVHLCKE".charAt(t.substring(8, 0) % 23) === t.charAt(8) : /^[KLM]{1}/.test(t) ? t[8] === String.fromCharCode(64) : !1 : !1
}, "Please specify a valid NIF number."), jQuery.validator.addMethod("nowhitespace", function (t, e) {
    return this.optional(e) || /^\S+$/i.test(t)
}, "No white space please"), jQuery.validator.addMethod("pattern", function (t, e, i) {
    return this.optional(e) ? !0 : ("string" == typeof i && (i = new RegExp(i)), i.test(t))
}, "Invalid format."), jQuery.validator.addMethod("phoneNL", function (t, e) {
    return this.optional(e) || /^((\+|00(\s|\s?\-\s?)?)31(\s|\s?\-\s?)?(\(0\)[\-\s]?)?|0)[1-9]((\s|\s?\-\s?)?[0-9]){8}$/.test(t)
}, "Please specify a valid phone number."), jQuery.validator.addMethod("phoneUK", function (t, e) {
    return t = t.replace(/\(|\)|\s+|-/g, ""), this.optional(e) || t.length > 9 && t.match(/^(?:(?:(?:00\s?|\+)44\s?)|(?:\(?0))(?:\d{2}\)?\s?\d{4}\s?\d{4}|\d{3}\)?\s?\d{3}\s?\d{3,4}|\d{4}\)?\s?(?:\d{5}|\d{3}\s?\d{3})|\d{5}\)?\s?\d{4,5})$/)
}, "Please specify a valid phone number"), jQuery.validator.addMethod("phoneUS", function (t, e) {
    return t = t.replace(/\s+/g, ""), this.optional(e) || t.length > 9 && t.match(/^(\+?1-?)?(\([2-9]([02-9]\d|1[02-9])\)|[2-9]([02-9]\d|1[02-9]))-?[2-9]([02-9]\d|1[02-9])-?\d{4}$/)
}, "Please specify a valid phone number"), jQuery.validator.addMethod("phonesUK", function (t, e) {
    return t = t.replace(/\(|\)|\s+|-/g, ""), this.optional(e) || t.length > 9 && t.match(/^(?:(?:(?:00\s?|\+)44\s?|0)(?:1\d{8,9}|[23]\d{9}|7(?:[1345789]\d{8}|624\d{6})))$/)
}, "Please specify a valid uk phone number"), jQuery.validator.addMethod("postalcodeNL", function (t, e) {
    return this.optional(e) || /^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/.test(t)
}, "Please specify a valid postal code"), jQuery.validator.addMethod("postcodeUK", function (t, e) {
    return this.optional(e) || /^((([A-PR-UWYZ][0-9])|([A-PR-UWYZ][0-9][0-9])|([A-PR-UWYZ][A-HK-Y][0-9])|([A-PR-UWYZ][A-HK-Y][0-9][0-9])|([A-PR-UWYZ][0-9][A-HJKSTUW])|([A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?([0-9][ABD-HJLNP-UW-Z]{2})|(GIR)\s?(0AA))$/i.test(t)
}, "Please specify a valid UK postcode"), jQuery.validator.addMethod("require_from_group", function (t, e, i) {
    var n = $(i[1], e.form), a = n.eq(0), r = a.data("valid_req_grp") ? a.data("valid_req_grp") : $.extend({}, this), s = n.filter(function () {
            return r.elementValue(this)
        }).length >= i[0];
    return a.data("valid_req_grp", r), $(e).data("being_validated") || (n.data("being_validated", !0), n.each(function () {
        r.element(this)
    }), n.data("being_validated", !1)), s
}, jQuery.validator.format("Please fill at least {0} of these fields.")), jQuery.validator.addMethod("skip_or_fill_minimum", function (t, e, i) {
    var n = $(i[1], e.form), a = n.eq(0), r = a.data("valid_skip") ? a.data("valid_skip") : $.extend({}, this), s = n.filter(function () {
        return r.elementValue(this)
    }).length, o = 0 === s || s >= i[0];
    return a.data("valid_skip", r), $(e).data("being_validated") || (n.data("being_validated", !0), n.each(function () {
        r.element(this)
    }), n.data("being_validated", !1)), o
}, jQuery.validator.format("Please either skip these fields or fill at least {0} of them.")), jQuery.validator.addMethod("strippedminlength", function (t, e, i) {
    return jQuery(t).text().length >= i
}, jQuery.validator.format("Please enter at least {0} characters")), jQuery.validator.addMethod("time", function (t, e) {
    return this.optional(e) || /^([01]\d|2[0-3])(:[0-5]\d){1,2}$/.test(t)
}, "Please enter a valid time, between 00:00 and 23:59"), jQuery.validator.addMethod("time12h", function (t, e) {
    return this.optional(e) || /^((0?[1-9]|1[012])(:[0-5]\d){1,2}(\ ?[AP]M))$/i.test(t)
}, "Please enter a valid time in 12-hour am/pm format"), jQuery.validator.addMethod("url2", function (t, e) {
    return this.optional(e) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t)
}, jQuery.validator.messages.url), jQuery.validator.addMethod("vinUS", function (t) {
    if (17 !== t.length)return !1;
    var e, i, n, a, r, s, o = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"], d = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 7, 9, 2, 3, 4, 5, 6, 7, 8, 9], l = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2], u = 0;
    for (e = 0; 17 > e; e++) {
        if (a = l[e], n = t.slice(e, e + 1), 8 === e && (s = n), isNaN(n)) {
            for (i = 0; i < o.length; i++)if (n.toUpperCase() === o[i]) {
                n = d[i], n *= a, isNaN(s) && 8 === i && (s = o[i]);
                break
            }
        } else n *= a;
        u += n
    }
    return r = u % 11, 10 === r && (r = "X"), r === s ? !0 : !1
}, "The specified vehicle identification number (VIN) is invalid."), jQuery.validator.addMethod("zipcodeUS", function (t, e) {
    return this.optional(e) || /^\d{5}-\d{4}$|^\d{5}$/.test(t)
}, "The specified US ZIP Code is invalid"), jQuery.validator.addMethod("ziprange", function (t, e) {
    return this.optional(e) || /^90[2-5]\d\{2\}-\d{4}$/.test(t)
}, "Your ZIP-code must be in the range 902xx-xxxx to 905-xx-xxxx"), function (t) {
    window.NestedFormEvents = function () {
        this.addFields = t.proxy(this.addFields, this), this.removeFields = t.proxy(this.removeFields, this)
    }, NestedFormEvents.prototype = {
        addFields: function (e) {
            var i = e.currentTarget, n = t(i).data("association"), a = t("#" + t(i).data("blueprint-id")), r = a.data("blueprint"), s = (t(i).closest(".fields").closestChild("input, textarea, select").eq(0).attr("name") || "").replace(new RegExp("[[a-z_]+]$"), "");
            if (s)for (var o = s.match(/[a-z_]+_attributes(?=\]\[(new_)?\d+\])/g) || [], d = s.match(/[0-9]+/g) || [], l = 0; l < o.length; l++)d[l] && (r = r.replace(new RegExp("(_" + o[l] + ")_.+?_", "g"), "$1_" + d[l] + "_"), r = r.replace(new RegExp("(\\[" + o[l] + "\\])\\[.+?\\]", "g"), "$1[" + d[l] + "]"));
            var u = new RegExp("new_" + n, "g"), c = this.newId();
            r = t.trim(r.replace(u, c));
            var h = this.insertFields(r, n, i);
            return h.trigger({type: "nested:fieldAdded", field: h}).trigger({
                type: "nested:fieldAdded:" + n,
                field: h
            }), !1
        }, newId: function () {
            return (new Date).getTime()
        }, insertFields: function (e, i, n) {
            var a = t(n).data("target");
            return a ? t(e).appendTo(t(a)) : t(e).insertBefore(n)
        }, removeFields: function (e) {
            var i = t(e.currentTarget), n = i.data("association"), a = i.prev("input[type=hidden]");
            a.val("1");
            var r = i.closest(".fields");
            return r.hide(), r.trigger({type: "nested:fieldRemoved", field: r}).trigger({
                type: "nested:fieldRemoved:" + n,
                field: r
            }), !1
        }
    }, window.nestedFormEvents = new NestedFormEvents, t(document).delegate("form a.add_nested_fields", "click", nestedFormEvents.addFields).delegate("form a.remove_nested_fields", "click", nestedFormEvents.removeFields)
}(jQuery), /*
 * Copyright 2011, Tobias Lindig
 *
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 */
    function (t) {
        t.fn.closestChild = function (e) {
            if (e && "" != e) {
                var i = [];
                for (i.push(this); i.length > 0;)for (var n = i.shift(), a = n.children(), r = 0; r < a.length; ++r) {
                    var s = t(a[r]);
                    if (s.is(e))return s;
                    i.push(s)
                }
            }
            return t()
        }
    }(jQuery), /**
 * @license
 * =========================================================
 * bootstrap-datetimepicker.js
 * http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Copyright 2012 Stefan Petre
 *
 * Contributions:
 *  - Andrew Rowls
 *  - Thiago de Arruda
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================
 */
    function (t) {
        function e(t) {
            return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        }

        function i(t, e, i) {
            return e < t.length ? t : Array(e - t.length + 1).join(i || " ") + t
        }

        function n(t, e, i, n, a, r) {
            return e && i ? '<div class="bootstrap-datetimepicker-widget dropdown-menu"><ul><li' + (r ? ' class="collapse in"' : "") + '><div class="datepicker">' + p.template + '</div></li><li class="picker-switch accordion-toggle"><a><i class="' + t + '"></i></a></li><li' + (r ? ' class="collapse"' : "") + '><div class="timepicker">' + m.getTemplate(n, a) + "</div></li></ul></div>" : i ? '<div class="bootstrap-datetimepicker-widget dropdown-menu"><div class="timepicker">' + m.getTemplate(n, a) + "</div></div>" : '<div class="bootstrap-datetimepicker-widget dropdown-menu"><div class="datepicker">' + p.template + "</div></div>"
        }

        function a() {
            return new Date(Date.UTC.apply(Date, arguments))
        }

        var r = (void 0 != window.orientation, function (t, e) {
            this.id = s++, this.init(t, e)
        });
        r.prototype = {
            constructor: r, init: function (e, i) {
                var a;
                if (!i.pickTime && !i.pickDate)throw new Error("Must choose at least one picker");
                if (this.options = i, this.$element = t(e), this.pickDate = i.pickDate, this.pickTime = i.pickTime, this.isInput = this.$element.is("input"), this.component = !1, (this.$element.find(".input-append") || this.$element.find(".input-prepend")) && (this.component = this.$element.find(".add-on")), this.language = i.language, this.language || (this.language = this.isInput ? this.$element.data("language") : this.$element.find("input").data("language"), this.language || (this.language = "en")), this.format = i.format, this.format || (this.format = this.isInput ? this.$element.data("format") : this.$element.find("input").data("format"), this.format || (this.format = "MM/dd/yyyy")), this._compileFormat(), this.component && (a = this.component.find("i")), this.pickTime && (a && a.length && (this.timeIcon = a.data("time-icon")), this.timeIcon || (this.timeIcon = "icon-time"), a.addClass(this.timeIcon)), this.pickDate && (a && a.length && (this.dateIcon = a.data("date-icon")), this.dateIcon || (this.dateIcon = "icon-calendar"), a.removeClass(this.timeIcon), a.addClass(this.dateIcon)), this.widget = t(n(this.timeIcon, i.pickDate, i.pickTime, i.pick12HourFormat, i.pickSeconds, i.collapse)).appendTo("body"), this.minViewMode = i.minViewMode || this.$element.data("date-minviewmode") || 0, "string" == typeof this.minViewMode)switch (this.minViewMode) {
                    case"months":
                        this.minViewMode = 1;
                        break;
                    case"years":
                        this.minViewMode = 2;
                        break;
                    default:
                        this.minViewMode = 0
                }
                if (this.viewMode = i.viewMode || this.$element.data("date-viewmode") || 0, "string" == typeof this.viewMode)switch (this.viewMode) {
                    case"months":
                        this.viewMode = 1;
                        break;
                    case"years":
                        this.viewMode = 2;
                        break;
                    default:
                        this.viewMode = 0
                }
                this.startViewMode = this.viewMode, this.weekStart = i.weekStart, this.weekStart || (this.weekStart = this.isInput ? this.$element.data("date-weekstart") : this.$element.find("input").data("date-weekstart"), this.weekStart || (this.weekStart = 0)), this.weekEnd = 0 === this.weekStart ? 6 : this.weekStart - 1, this.setStartDate(i.startDate || this.$element.data("date-startdate")), this.setEndDate(i.endDate || this.$element.data("date-enddate")), this.fillDow(), this.fillMonths(), this.fillHours(), this.fillMinutes(), this.fillSeconds(), this.update(), this.showMode(), this._attachDatePickerEvents()
            }, show: function (t) {
                this.widget.show(), this.height = this.component ? this.component.outerHeight() : this.$element.outerHeight(), this.place(), this.$element.trigger({
                    type: "show",
                    date: this._date
                }), this._attachDatePickerGlobalEvents(), t && (t.stopPropagation(), t.preventDefault())
            }, disable: function () {
                this.$element.find("input").prop("disabled", !0), this._detachDatePickerEvents()
            }, enable: function () {
                this.$element.find("input").prop("disabled", !1), this._attachDatePickerEvents()
            }, hide: function () {
                for (var t = this.widget.find(".collapse"), e = 0; e < t.length; e++) {
                    var i = t.eq(e).data("collapse");
                    if (i && i.transitioning)return
                }
                this.widget.hide(), this.viewMode = this.startViewMode, this.showMode(), this.set(), this.$element.trigger({
                    type: "hide",
                    date: this._date
                }), this._detachDatePickerGlobalEvents()
            }, set: function () {
                var t = "";
                if (this._unset || (t = this.formatDate(this._date)), this.isInput)this.$element.val(t), this._resetMaskPos(this.$element); else {
                    if (this.component) {
                        var e = this.$element.find("input");
                        e.val(t), this._resetMaskPos(e)
                    }
                    this.$element.data("date", t)
                }
            }, setValue: function (t) {
                this._unset = t ? !1 : !0, "string" == typeof t ? this._date = this.parseDate(t) : t && (this._date = new Date(t)), this.set(), this.viewDate = a(this._date.getUTCFullYear(), this._date.getUTCMonth(), 1, 0, 0, 0, 0), this.fillDate(), this.fillTime()
            }, getDate: function () {
                return this._unset ? null : new Date(this._date.valueOf())
            }, setDate: function (t) {
                this.setValue(t ? t.valueOf() : null)
            }, setStartDate: function (t) {
                t instanceof Date ? this.startDate = t : "string" == typeof t ? (this.startDate = new a(t), this.startDate.getUTCFullYear() || (this.startDate = -1 / 0)) : this.startDate = -1 / 0, this.viewDate && this.update()
            }, setEndDate: function (t) {
                t instanceof Date ? this.endDate = t : "string" == typeof t ? (this.endDate = new a(t), this.endDate.getUTCFullYear() || (this.endDate = 1 / 0)) : this.endDate = 1 / 0, this.viewDate && this.update()
            }, getLocalDate: function () {
                if (this._unset)return null;
                var t = this._date;
                return new Date(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate(), t.getUTCHours(), t.getUTCMinutes(), t.getUTCSeconds(), t.getUTCMilliseconds())
            }, setLocalDate: function (t) {
                this.setValue(t ? Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()) : null)
            }, place: function () {
                var e = "absolute", i = this.component ? this.component.offset() : this.$element.offset();
                this.width = this.component ? this.component.outerWidth() : this.$element.outerWidth(), i.top = i.top + this.height;
                var n = t(window);
                void 0 != this.options.width && this.widget.width(this.options.width), "left" == this.options.orientation && (this.widget.addClass("left-oriented"), i.left = i.left - this.widget.width() + 20), this._isInFixed() && (e = "fixed", i.top -= n.scrollTop(), i.left -= n.scrollLeft()), n.width() < i.left + this.widget.outerWidth() ? (i.right = n.width() - i.left - this.width, i.left = "auto", this.widget.addClass("pull-right")) : (i.right = "auto", this.widget.removeClass("pull-right")), this.widget.css({
                    position: e,
                    top: i.top,
                    left: i.left,
                    right: i.right
                })
            }, notifyChange: function () {
                this.$element.trigger({type: "changeDate", date: this.getDate(), localDate: this.getLocalDate()})
            }, update: function (t) {
                var e = t;
                if (!e && (e = this.isInput ? this.$element.val() : this.$element.find("input").val(), e && (this._date = this.parseDate(e)), !this._date)) {
                    var i = new Date;
                    this._date = a(i.getFullYear(), i.getMonth(), i.getDate(), i.getHours(), i.getMinutes(), i.getSeconds(), i.getMilliseconds())
                }
                this.viewDate = a(this._date.getUTCFullYear(), this._date.getUTCMonth(), 1, 0, 0, 0, 0), this.fillDate(), this.fillTime()
            }, fillDow: function () {
                for (var e = this.weekStart, i = t("<tr>"); e < this.weekStart + 7;)i.append('<th class="dow">' + o[this.language].daysMin[e++ % 7] + "</th>");
                this.widget.find(".datepicker-days thead").append(i)
            }, fillMonths: function () {
                for (var t = "", e = 0; 12 > e;)t += '<span class="month">' + o[this.language].monthsShort[e++] + "</span>";
                this.widget.find(".datepicker-months td").append(t)
            }, fillDate: function () {
                var e = this.viewDate.getUTCFullYear(), i = this.viewDate.getUTCMonth(), n = a(this._date.getUTCFullYear(), this._date.getUTCMonth(), this._date.getUTCDate(), 0, 0, 0, 0), r = "object" == typeof this.startDate ? this.startDate.getUTCFullYear() : -1 / 0, s = "object" == typeof this.startDate ? this.startDate.getUTCMonth() : -1, d = "object" == typeof this.endDate ? this.endDate.getUTCFullYear() : 1 / 0, l = "object" == typeof this.endDate ? this.endDate.getUTCMonth() : 12;
                this.widget.find(".datepicker-days").find(".disabled").removeClass("disabled"), this.widget.find(".datepicker-months").find(".disabled").removeClass("disabled"), this.widget.find(".datepicker-years").find(".disabled").removeClass("disabled"), this.widget.find(".datepicker-days th:eq(1)").text(o[this.language].months[i] + " " + e);
                var u = a(e, i - 1, 28, 0, 0, 0, 0), c = p.getDaysInMonth(u.getUTCFullYear(), u.getUTCMonth());
                u.setUTCDate(c), u.setUTCDate(c - (u.getUTCDay() - this.weekStart + 7) % 7), (e == r && s >= i || r > e) && this.widget.find(".datepicker-days th:eq(0)").addClass("disabled"), (e == d && i >= l || e > d) && this.widget.find(".datepicker-days th:eq(2)").addClass("disabled");
                var h = new Date(u.valueOf());
                h.setUTCDate(h.getUTCDate() + 42), h = h.valueOf();
                for (var m, f, g = []; u.valueOf() < h;)u.getUTCDay() === this.weekStart && (m = t("<tr>"), g.push(m)), f = "", u.getUTCFullYear() < e || u.getUTCFullYear() == e && u.getUTCMonth() < i ? f += " old" : (u.getUTCFullYear() > e || u.getUTCFullYear() == e && u.getUTCMonth() > i) && (f += " new"), u.valueOf() === n.valueOf() && (f += " active"), u.valueOf() + 864e5 <= this.startDate && (f += " disabled"), u.valueOf() > this.endDate && (f += " disabled"), m.append('<td class="day' + f + '">' + u.getUTCDate() + "</td>"), u.setUTCDate(u.getUTCDate() + 1);
                this.widget.find(".datepicker-days tbody").empty().append(g);
                var v = this._date.getUTCFullYear(), $ = this.widget.find(".datepicker-months").find("th:eq(1)").text(e).end().find("span").removeClass("active");
                v === e && $.eq(this._date.getUTCMonth()).addClass("active"), r > v - 1 && this.widget.find(".datepicker-months th:eq(0)").addClass("disabled"), v + 1 > d && this.widget.find(".datepicker-months th:eq(2)").addClass("disabled");
                for (var b = 0; 12 > b; b++)e == r && s > b || r > e ? t($[b]).addClass("disabled") : (e == d && b > l || e > d) && t($[b]).addClass("disabled");
                g = "", e = 10 * parseInt(e / 10, 10);
                var _ = this.widget.find(".datepicker-years").find("th:eq(1)").text(e + "-" + (e + 9)).end().find("td");
                this.widget.find(".datepicker-years").find("th").removeClass("disabled"), r > e && this.widget.find(".datepicker-years").find("th:eq(0)").addClass("disabled"), e + 9 > d && this.widget.find(".datepicker-years").find("th:eq(2)").addClass("disabled"), e -= 1;
                for (var b = -1; 11 > b; b++)g += '<span class="year' + (-1 === b || 10 === b ? " old" : "") + (v === e ? " active" : "") + (r > e || e > d ? " disabled" : "") + '">' + e + "</span>", e += 1;
                _.html(g)
            }, fillHours: function () {
                var t = this.widget.find(".timepicker .timepicker-hours table");
                t.parent().hide();
                var e = "";
                if (this.options.pick12HourFormat)for (var n = 1, a = 0; 3 > a; a += 1) {
                    e += "<tr>";
                    for (var r = 0; 4 > r; r += 1) {
                        var s = n.toString();
                        e += '<td class="hour">' + i(s, 2, "0") + "</td>", n++
                    }
                    e += "</tr>"
                } else for (var n = 0, a = 0; 6 > a; a += 1) {
                    e += "<tr>";
                    for (var r = 0; 4 > r; r += 1) {
                        var s = n.toString();
                        e += '<td class="hour">' + i(s, 2, "0") + "</td>", n++
                    }
                    e += "</tr>"
                }
                t.html(e)
            }, fillMinutes: function () {
                var t = this.widget.find(".timepicker .timepicker-minutes table");
                t.parent().hide();
                for (var e = "", n = 0, a = 0; 5 > a; a++) {
                    e += "<tr>";
                    for (var r = 0; 4 > r; r += 1) {
                        var s = n.toString();
                        e += '<td class="minute">' + i(s, 2, "0") + "</td>", n += 3
                    }
                    e += "</tr>"
                }
                t.html(e)
            }, fillSeconds: function () {
                var t = this.widget.find(".timepicker .timepicker-seconds table");
                t.parent().hide();
                for (var e = "", n = 0, a = 0; 5 > a; a++) {
                    e += "<tr>";
                    for (var r = 0; 4 > r; r += 1) {
                        var s = n.toString();
                        e += '<td class="second">' + i(s, 2, "0") + "</td>", n += 3
                    }
                    e += "</tr>"
                }
                t.html(e)
            }, fillTime: function () {
                if (this._date) {
                    var t = this.widget.find(".timepicker span[data-time-component]"), e = (t.closest("table"), this.options.pick12HourFormat), n = this._date.getUTCHours(), a = "AM";
                    e && (n >= 12 && (a = "PM"), 0 === n ? n = 12 : 12 != n && (n %= 12), this.widget.find(".timepicker [data-action=togglePeriod]").text(a)), n = i(n.toString(), 2, "0");
                    var r = i(this._date.getUTCMinutes().toString(), 2, "0"), s = i(this._date.getUTCSeconds().toString(), 2, "0");
                    t.filter("[data-time-component=hours]").text(n), t.filter("[data-time-component=minutes]").text(r), t.filter("[data-time-component=seconds]").text(s)
                }
            }, click: function (e) {
                e.stopPropagation(), e.preventDefault(), this._unset = !1;
                var i = t(e.target).closest("span, td, th");
                if (1 === i.length && !i.is(".disabled"))switch (i[0].nodeName.toLowerCase()) {
                    case"th":
                        switch (i[0].className) {
                            case"switch":
                                this.showMode(1);
                                break;
                            case"prev":
                            case"next":
                                var n = this.viewDate, r = p.modes[this.viewMode].navFnc, s = p.modes[this.viewMode].navStep;
                                "prev" === i[0].className && (s = -1 * s), n["set" + r](n["get" + r]() + s), this.fillDate(), this.set()
                        }
                        break;
                    case"span":
                        if (i.is(".month")) {
                            var o = i.parent().find("span").index(i);
                            this.viewDate.setUTCMonth(o)
                        } else {
                            var d = parseInt(i.text(), 10) || 0;
                            this.viewDate.setUTCFullYear(d)
                        }
                        0 !== this.viewMode && (this._date = a(this.viewDate.getUTCFullYear(), this.viewDate.getUTCMonth(), this.viewDate.getUTCDate(), this._date.getUTCHours(), this._date.getUTCMinutes(), this._date.getUTCSeconds(), this._date.getUTCMilliseconds()), this.notifyChange()), this.showMode(-1), this.fillDate(), this.set();
                        break;
                    case"td":
                        if (i.is(".day")) {
                            var l = parseInt(i.text(), 10) || 1, o = this.viewDate.getUTCMonth(), d = this.viewDate.getUTCFullYear();
                            i.is(".old") ? 0 === o ? (o = 11, d -= 1) : o -= 1 : i.is(".new") && (11 == o ? (o = 0, d += 1) : o += 1), this._date = a(d, o, l, this._date.getUTCHours(), this._date.getUTCMinutes(), this._date.getUTCSeconds(), this._date.getUTCMilliseconds()), this.viewDate = a(d, o, Math.min(28, l), 0, 0, 0, 0), this.fillDate(), this.set(), this.notifyChange()
                        }
                }
            }, actions: {
                incrementHours: function () {
                    this._date.setUTCHours(this._date.getUTCHours() + 1)
                }, incrementMinutes: function () {
                    this._date.setUTCMinutes(this._date.getUTCMinutes() + 1)
                }, incrementSeconds: function () {
                    this._date.setUTCSeconds(this._date.getUTCSeconds() + 1)
                }, decrementHours: function () {
                    this._date.setUTCHours(this._date.getUTCHours() - 1)
                }, decrementMinutes: function () {
                    this._date.setUTCMinutes(this._date.getUTCMinutes() - 1)
                }, decrementSeconds: function () {
                    this._date.setUTCSeconds(this._date.getUTCSeconds() - 1)
                }, togglePeriod: function () {
                    var t = this._date.getUTCHours();
                    t >= 12 ? t -= 12 : t += 12, this._date.setUTCHours(t)
                }, showPicker: function () {
                    this.widget.find(".timepicker > div:not(.timepicker-picker)").hide(), this.widget.find(".timepicker .timepicker-picker").show()
                }, showHours: function () {
                    this.widget.find(".timepicker .timepicker-picker").hide(), this.widget.find(".timepicker .timepicker-hours").show()
                }, showMinutes: function () {
                    this.widget.find(".timepicker .timepicker-picker").hide(), this.widget.find(".timepicker .timepicker-minutes").show()
                }, showSeconds: function () {
                    this.widget.find(".timepicker .timepicker-picker").hide(), this.widget.find(".timepicker .timepicker-seconds").show()
                }, selectHour: function (e) {
                    var i = t(e.target), n = parseInt(i.text(), 10);
                    if (this.options.pick12HourFormat) {
                        var a = this._date.getUTCHours();
                        a >= 12 ? 12 != n && (n = (n + 12) % 24) : 12 === n ? n = 0 : n %= 12
                    }
                    this._date.setUTCHours(n), this.actions.showPicker.call(this)
                }, selectMinute: function (e) {
                    var i = t(e.target), n = parseInt(i.text(), 10);
                    this._date.setUTCMinutes(n), this.actions.showPicker.call(this)
                }, selectSecond: function (e) {
                    var i = t(e.target), n = parseInt(i.text(), 10);
                    this._date.setUTCSeconds(n), this.actions.showPicker.call(this)
                }
            }, doAction: function (e) {
                e.stopPropagation(), e.preventDefault(), this._date || (this._date = a(1970, 0, 0, 0, 0, 0, 0));
                var i = t(e.currentTarget).data("action"), n = this.actions[i].apply(this, arguments);
                return this.set(), this.fillTime(), this.notifyChange(), n
            }, stopEvent: function (t) {
                t.stopPropagation(), t.preventDefault()
            }, keydown: function (e) {
                var i = this, n = e.which, a = t(e.target);
                (8 == n || 46 == n) && setTimeout(function () {
                    i._resetMaskPos(a)
                })
            }, keypress: function (e) {
                var i = e.which;
                if (8 != i && 46 != i) {
                    var n = t(e.target), a = String.fromCharCode(i), r = n.val() || "";
                    r += a;
                    var s = this._mask[this._maskPos];
                    if (!s)return !1;
                    if (s.end == r.length) {
                        if (!s.pattern.test(r.slice(s.start))) {
                            for (r = r.slice(0, r.length - 1); (s = this._mask[this._maskPos]) && s.character;)r += s.character, this._maskPos++;
                            return r += a, s.end != r.length ? (n.val(r), !1) : s.pattern.test(r.slice(s.start)) ? (n.val(r), this._maskPos++, !1) : (n.val(r.slice(0, s.start)), !1)
                        }
                        this._maskPos++
                    }
                }
            }, change: function (e) {
                var i = t(e.target), n = i.val();
                this._formatPattern.test(n) ? (this.update(), this.setValue(this._date.getTime()), this.notifyChange(), this.set()) : n && n.trim() ? (this.setValue(this._date.getTime()), this._date ? this.set() : i.val("")) : this._date && (this.setValue(null), this.notifyChange(), this._unset = !0), this._resetMaskPos(i)
            }, showMode: function (t) {
                t && (this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + t))), this.widget.find(".datepicker > div").hide().filter(".datepicker-" + p.modes[this.viewMode].clsName).show()
            }, destroy: function () {
                this._detachDatePickerEvents(), this._detachDatePickerGlobalEvents(), this.widget.remove(), this.$element.removeData("datetimepicker"), this.component.removeData("datetimepicker")
            }, formatDate: function (t) {
                return this.format.replace(h, function (e) {
                    var n, a, r, s = e.length;
                    if ("ms" === e && (s = 1), a = d[e].property, "Hours12" === a)r = t.getUTCHours(), 0 === r ? r = 12 : 12 !== r && (r %= 12); else {
                        if ("Period12" === a)return t.getUTCHours() >= 12 ? "PM" : "AM";
                        n = "get" + a, r = t[n]()
                    }
                    return "getUTCMonth" === n && (r += 1), "getUTCYear" === n && (r = r + 1900 - 2e3), i(r.toString(), s, "0")
                })
            }, parseDate: function (t) {
                var e, i, n, a, r = {};
                if (!(e = this._formatPattern.exec(t)))return null;
                for (i = 1; i < e.length; i++)n = this._propertiesByIndex[i], n && (a = e[i], /^\d+$/.test(a) && (a = parseInt(a, 10)), r[n] = a);
                return this._finishParsingDate(r)
            }, _resetMaskPos: function (t) {
                for (var e = t.val(), i = 0; i < this._mask.length; i++) {
                    if (this._mask[i].end > e.length) {
                        this._maskPos = i;
                        break
                    }
                    if (this._mask[i].end === e.length) {
                        this._maskPos = i + 1;
                        break
                    }
                }
            }, _finishParsingDate: function (t) {
                var e, i, n, r, s, o, d;
                return e = t.UTCFullYear, t.UTCYear && (e = 2e3 + t.UTCYear), e || (e = 1970), i = t.UTCMonth ? t.UTCMonth - 1 : 0, n = t.UTCDate || 1, r = t.UTCHours || 0, s = t.UTCMinutes || 0, o = t.UTCSeconds || 0, d = t.UTCMilliseconds || 0, t.Hours12 && (r = t.Hours12), t.Period12 && (/pm/i.test(t.Period12) ? 12 != r && (r = (r + 12) % 24) : r %= 12), a(e, i, n, r, s, o, d)
            }, _compileFormat: function () {
                for (var t, i, n = [], a = [], r = this.format, s = {}, o = 0, l = 0; t = c.exec(r);)i = t[0], i in d ? (o++, s[o] = d[i].property, n.push("\\s*" + d[i].getPattern(this) + "\\s*"), a.push({
                    pattern: new RegExp(d[i].getPattern(this)),
                    property: d[i].property,
                    start: l,
                    end: l += i.length
                })) : (n.push(e(i)), a.push({
                    pattern: new RegExp(e(i)),
                    character: i,
                    start: l,
                    end: ++l
                })), r = r.slice(i.length);
                this._mask = a, this._maskPos = 0, this._formatPattern = new RegExp("^\\s*" + n.join("") + "\\s*$"), this._propertiesByIndex = s
            }, _attachDatePickerEvents: function () {
                var e = this;
                this.widget.on("click", ".datepicker *", t.proxy(this.click, this)), this.widget.on("click", "[data-action]", t.proxy(this.doAction, this)), this.widget.on("mousedown", t.proxy(this.stopEvent, this)), this.pickDate && this.pickTime && this.widget.on("click.togglePicker", ".accordion-toggle", function (i) {
                    i.stopPropagation();
                    var n = t(this), a = n.closest("ul"), r = a.find(".collapse.in"), s = a.find(".collapse:not(.in)");
                    if (r && r.length) {
                        var o = r.data("collapse");
                        if (o && o.transitioning)return;
                        r.collapse("hide"), s.collapse("show"), n.find("i").toggleClass(e.timeIcon + " " + e.dateIcon), e.$element.find(".add-on i").toggleClass(e.timeIcon + " " + e.dateIcon)
                    }
                }), this.isInput ? (this.$element.on({
                    focus: t.proxy(this.show, this),
                    change: t.proxy(this.change, this)
                }), this.options.maskInput && this.$element.on({
                    keydown: t.proxy(this.keydown, this),
                    keypress: t.proxy(this.keypress, this)
                })) : (this.$element.on({change: t.proxy(this.change, this)}, "input"), this.options.maskInput && this.$element.on({
                    keydown: t.proxy(this.keydown, this),
                    keypress: t.proxy(this.keypress, this)
                }, "input"), this.component ? this.component.on("click", t.proxy(this.show, this)) : this.$element.on("click", t.proxy(this.show, this)))
            }, _attachDatePickerGlobalEvents: function () {
                t(window).on("resize.datetimepicker" + this.id, t.proxy(this.place, this)), this.isInput || t(document).on("mousedown.datetimepicker" + this.id, t.proxy(this.hide, this))
            }, _detachDatePickerEvents: function () {
                this.widget.off("click", ".datepicker *", this.click), this.widget.off("click", "[data-action]"), this.widget.off("mousedown", this.stopEvent), this.pickDate && this.pickTime && this.widget.off("click.togglePicker"), this.isInput ? (this.$element.off({
                    focus: this.show,
                    change: this.change
                }), this.options.maskInput && this.$element.off({
                    keydown: this.keydown,
                    keypress: this.keypress
                })) : (this.$element.off({change: this.change}, "input"), this.options.maskInput && this.$element.off({
                    keydown: this.keydown,
                    keypress: this.keypress
                }, "input"), this.component ? this.component.off("click", this.show) : this.$element.off("click", this.show))
            }, _detachDatePickerGlobalEvents: function () {
                t(window).off("resize.datetimepicker" + this.id), this.isInput || t(document).off("mousedown.datetimepicker" + this.id)
            }, _isInFixed: function () {
                if (this.$element) {
                    for (var e = this.$element.parents(), i = !1, n = 0; n < e.length; n++)if ("fixed" == t(e[n]).css("position")) {
                        i = !0;
                        break
                    }
                    return i
                }
                return !1
            }
        }, t.fn.datetimepicker = function (e, i) {
            return this.each(function () {
                var n = t(this), a = n.data("datetimepicker"), s = "object" == typeof e && e;
                a || n.data("datetimepicker", a = new r(this, t.extend({}, t.fn.datetimepicker.defaults, s))), "string" == typeof e && a[e](i)
            })
        }, t.fn.datetimepicker.defaults = {
            maskInput: !1,
            pickDate: !0,
            pickTime: !0,
            pick12HourFormat: !1,
            pickSeconds: !0,
            startDate: -1 / 0,
            endDate: 1 / 0,
            collapse: !0
        }, t.fn.datetimepicker.Constructor = r;
        var s = 0, o = t.fn.datetimepicker.dates = {
            en: {
                days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            }
        }, d = {
            dd: {
                property: "UTCDate", getPattern: function () {
                    return "(0?[1-9]|[1-2][0-9]|3[0-1])\\b"
                }
            }, MM: {
                property: "UTCMonth", getPattern: function () {
                    return "(0?[1-9]|1[0-2])\\b"
                }
            }, yy: {
                property: "UTCYear", getPattern: function () {
                    return "(\\d{2})\\b"
                }
            }, yyyy: {
                property: "UTCFullYear", getPattern: function () {
                    return "(\\d{4})\\b"
                }
            }, hh: {
                property: "UTCHours", getPattern: function () {
                    return "(0?[0-9]|1[0-9]|2[0-3])\\b"
                }
            }, mm: {
                property: "UTCMinutes", getPattern: function () {
                    return "(0?[0-9]|[1-5][0-9])\\b"
                }
            }, ss: {
                property: "UTCSeconds", getPattern: function () {
                    return "(0?[0-9]|[1-5][0-9])\\b"
                }
            }, ms: {
                property: "UTCMilliseconds", getPattern: function () {
                    return "([0-9]{1,3})\\b"
                }
            }, HH: {
                property: "Hours12", getPattern: function () {
                    return "(0?[1-9]|1[0-2])\\b"
                }
            }, PP: {
                property: "Period12", getPattern: function () {
                    return "(AM|PM|am|pm|Am|aM|Pm|pM)\\b"
                }
            }
        }, l = [];
        for (var u in d)l.push(u);
        l[l.length - 1] += "\\b", l.push(".");
        var c = new RegExp(l.join("\\b|"));
        l.pop();
        var h = new RegExp(l.join("\\b|"), "g"), p = {
            modes: [{
                clsName: "days",
                navFnc: "UTCMonth",
                navStep: 1
            }, {clsName: "months", navFnc: "UTCFullYear", navStep: 1}, {
                clsName: "years",
                navFnc: "UTCFullYear",
                navStep: 10
            }],
            isLeapYear: function (t) {
                return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0
            },
            getDaysInMonth: function (t, e) {
                return [31, p.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
            },
            headTemplate: '<thead><tr><th class="prev">&lsaquo;</th><th colspan="5" class="switch"></th><th class="next">&rsaquo;</th></tr></thead>',
            contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
        };
        p.template = '<div class="datepicker-days"><table class="table-condensed">' + p.headTemplate + '<tbody></tbody></table></div><div class="datepicker-months"><table class="table-condensed">' + p.headTemplate + p.contTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + p.headTemplate + p.contTemplate + "</table></div>";
        var m = {
            hourTemplate: '<span data-action="showHours" data-time-component="hours" class="timepicker-hour"></span>',
            minuteTemplate: '<span data-action="showMinutes" data-time-component="minutes" class="timepicker-minute"></span>',
            secondTemplate: '<span data-action="showSeconds" data-time-component="seconds" class="timepicker-second"></span>'
        };
        m.getTemplate = function (t, e) {
            return '<div class="timepicker-picker"><table class="table-condensed"' + (t ? ' data-hour-format="12"' : "") + '><tr><td><a href="#" class="btn" data-action="incrementHours"><i class="icon-chevron-up"></i></a></td><td class="separator"></td><td><a href="#" class="btn" data-action="incrementMinutes"><i class="icon-chevron-up"></i></a></td>' + (e ? '<td class="separator"></td><td><a href="#" class="btn" data-action="incrementSeconds"><i class="icon-chevron-up"></i></a></td>' : "") + (t ? '<td class="separator"></td>' : "") + "</tr><tr><td>" + m.hourTemplate + '</td> <td class="separator">:</td><td>' + m.minuteTemplate + "</td> " + (e ? '<td class="separator">:</td><td>' + m.secondTemplate + "</td>" : "") + (t ? '<td class="separator"></td><td><button type="button" class="btn btn-primary" data-action="togglePeriod"></button></td>' : "") + '</tr><tr><td><a href="#" class="btn" data-action="decrementHours"><i class="icon-chevron-down"></i></a></td><td class="separator"></td><td><a href="#" class="btn" data-action="decrementMinutes"><i class="icon-chevron-down"></i></a></td>' + (e ? '<td class="separator"></td><td><a href="#" class="btn" data-action="decrementSeconds"><i class="icon-chevron-down"></i></a></td>' : "") + (t ? '<td class="separator"></td>' : "") + '</tr></table></div><div class="timepicker-hours" data-action="selectHour"><table class="table-condensed"></table></div><div class="timepicker-minutes" data-action="selectMinute"><table class="table-condensed"></table></div>' + (e ? '<div class="timepicker-seconds" data-action="selectSecond"><table class="table-condensed"></table></div>' : "")
        }
    }(window.jQuery), $(function () {
    $(".datepicker").datetimepicker({pickTime: !1})
}), $(function () {
    $(".datetimepicker").datetimepicker({pickSeconds: !1})
}), $(function () {
    $(".timepicker").datetimepicker({pickDate: !1, pickSeconds: !1})
}), function (t) {
    t.fn.datetimepicker.dates.bg = {
        days: ["\u041d\u0435\u0434\u0435\u043b\u044f", "\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u043d\u0438\u043a", "\u0412\u0442\u043e\u0440\u043d\u0438\u043a", "\u0421\u0440\u044f\u0434\u0430", "\u0427\u0435\u0442\u0432\u044a\u0440\u0442\u044a\u043a", "\u041f\u0435\u0442\u044a\u043a", "\u0421\u044a\u0431\u043e\u0442\u0430", "\u041d\u0435\u0434\u0435\u043b\u044f"],
        daysShort: ["\u041d\u0435\u0434", "\u041f\u043e\u043d", "\u0412\u0442\u043e", "\u0421\u0440\u044f", "\u0427\u0435\u0442", "\u041f\u0435\u0442", "\u0421\u044a\u0431", "\u041d\u0435\u0434"],
        daysMin: ["\u041d", "\u041f", "\u0412", "\u0421", "\u0427", "\u041f", "\u0421", "\u041d"],
        months: ["\u042f\u043d\u0443\u0430\u0440\u0438", "\u0424\u0435\u0432\u0440\u0443\u0430\u0440\u0438", "\u041c\u0430\u0440\u0442", "\u0410\u043f\u0440\u0438\u043b", "\u041c\u0430\u0439", "\u042e\u043d\u0438", "\u042e\u043b\u0438", "\u0410\u0432\u0433\u0443\u0441\u0442", "\u0421\u0435\u043f\u0442\u0435\u043c\u0432\u0440\u0438", "\u041e\u043a\u0442\u043e\u043c\u0432\u0440\u0438", "\u041d\u043e\u0435\u043c\u0432\u0440\u0438", "\u0414\u0435\u043a\u0435\u043c\u0432\u0440\u0438"],
        monthsShort: ["\u042f\u043d", "\u0424\u0435\u0432", "\u041c\u0430\u0440", "\u0410\u043f\u0440", "\u041c\u0430\u0439", "\u042e\u043d\u0438", "\u042e\u043b\u0438", "\u0410\u0432\u0433", "\u0421\u0435\u043f", "\u041e\u043a\u0442", "\u041d\u043e\u0435", "\u0414\u0435\u043a"],
        today: "\u0434\u043d\u0435\u0441"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.cs = {
        days: ["Ned\u011ble", "Pond\u011bl\xed", "\xdater\xfd", "St\u0159eda", "\u010ctvrtek", "P\xe1tek", "Sobota", "Ned\u011ble"],
        daysShort: ["Ne", "Po", "\xdat", "St", "\u010ct", "P\xe1", "So", "Ne"],
        daysMin: ["N", "P", "\xda", "St", "\u010c", "P", "So", "N"],
        months: ["Leden", "\xdanor", "B\u0159ezen", "Duben", "Kv\u011bten", "\u010cerven", "\u010cervenec", "Srpen", "Z\xe1\u0159\xed", "\u0158\xedjen", "Listopad", "Prosinec"],
        monthsShort: ["Led", "\xdano", "B\u0159e", "Dub", "Kv\u011b", "\u010cer", "\u010cnc", "Srp", "Z\xe1\u0159", "\u0158\xedj", "Lis", "Pro"],
        today: "Dnes"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.da = {
        days: ["S\xf8ndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "L\xf8rdag", "S\xf8ndag"],
        daysShort: ["S\xf8n", "Man", "Tir", "Ons", "Tor", "Fre", "L\xf8r", "S\xf8n"],
        daysMin: ["S\xf8", "Ma", "Ti", "On", "To", "Fr", "L\xf8", "S\xf8"],
        months: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
        today: "I Dag"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.de = {
        days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
        daysShort: ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam", "Son"],
        daysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
        months: ["Januar", "Februar", "M\xe4rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
        monthsShort: ["Jan", "Feb", "M\xe4r", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
        today: "Heute"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.es = {
        days: ["Domingo", "Lunes", "Martes", "Mi\xe9rcoles", "Jueves", "Viernes", "S\xe1bado", "Domingo"],
        daysShort: ["Dom", "Lun", "Mar", "Mi\xe9", "Jue", "Vie", "S\xe1b", "Dom"],
        daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
        today: "Hoy"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates["fa-IR"] = {
        days: ["\u06cc\u06a9\u0634\u0646\u0628\u0647", "\u062f\u0648\u0634\u0646\u0628\u0647", "\u0633\u0647 \u0634\u0646\u0628\u0647", "\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647", "\u067e\u0646\u062c\u0634\u0646\u0628\u0647", "\u062c\u0645\u0639\u0647", "\u0634\u0646\u0628\u0647", "\u06cc\u06a9\u0634\u0646\u0628\u0647"],
        daysShort: ["\u06cc\u06a9\u0634\u0646\u0628\u0647", "\u062f\u0648\u0634\u0646\u0628\u0647", "\u0633\u0647 \u0634\u0646\u0628\u0647", "\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647", "\u067e\u0646\u062c\u0634\u0646\u0628\u0647", "\u062c\u0645\u0639\u0647", "\u0634\u0646\u0628\u0647", "\u06cc\u06a9\u0634\u0646\u0628\u0647"],
        daysMin: ["\u0634\u06f1 \u06f1", "\u06f2 \u0634", "\u06f3 \u0634", "\u06f4 \u0634", "\u06f5 \u0634", "\u062c", "\u0634", "\u06f1 \u0634"],
        months: ["\u0698\u0627\u0646\u0648\u06cc\u0647", "\u0641\u0648\u0631\u06cc\u0647", "\u0645\u0627\u0631\u0633", "\u0622\u0648\u0631\u06cc\u0644", "\u0645\u06cc", "\u0698\u0648\u0626\u0646", "\u062c\u0648\u0644\u0627\u06cc", "\u0622\u06af\u0648\u0633\u062a", "\u0633\u067e\u062a\u0627\u0645\u0628\u0631", "\u0627\u06a9\u062a\u0628\u0631", "\u0646\u0648\u0627\u0645\u0628\u0631", "\u062f\u0633\u0627\u0645\u0628\u0631"],
        monthsShort: ["\u0698\u0627\u0646\u0648\u06cc\u0647", "\u0641\u0648\u0631\u06cc\u0647", "\u0645\u0627\u0631\u0633", "\u0622\u0648\u0631\u06cc\u0644", "\u0645\u06cc", "\u0698\u0648\u0626\u0646", "\u062c\u0648\u0644\u0627\u06cc", "\u0622\u06af\u0648\u0633\u062a", "\u0633\u067e\u062a\u0627\u0645\u0628\u0631", "\u0627\u06a9\u062a\u0628\u0631", "\u0646\u0648\u0627\u0645\u0628\u0631", "\u062f\u0633\u0627\u0645\u0628\u0631"],
        today: "\u0627\u0645\u0631\u0648\u0632"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.fi = {
        days: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai", "sunnuntai"],
        daysShort: ["sun", "maa", "tii", "kes", "tor", "per", "lau", "sun"],
        daysMin: ["su", "ma", "ti", "ke", "to", "pe", "la", "su"],
        months: ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kes\xe4kuu", "hein\xe4kuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"],
        monthsShort: ["tam", "hel", "maa", "huh", "tou", "kes", "hei", "elo", "syy", "lok", "mar", "jou"],
        today: "t\xe4n\xe4\xe4n"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.fo = {
        days: ["Sunnudagur", "M\xe1nadagur", "T\xfdsdagur", "Mikudagur", "H\xf3sdagur", "Fr\xedggjadagur", "Leygardagur", "Sunnudagur"],
        daysShort: ["Sun", "M\xe1n", "T\xfds", "Mik", "H\xf3s", "Fr\xed", "Ley", "Sun"],
        daysMin: ["Su", "M\xe1", "T\xfd", "Mi", "H\xf3", "Fr", "Le", "Su"],
        months: ["Januar", "Februar", "Mars", "Apr\xedl", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
        today: "\xcd dag"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.fr = {
        days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
        daysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
        daysMin: ["D", "L", "Ma", "Me", "J", "V", "S", "D"],
        months: ["Janvier", "F\xe9vrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Ao\xfbt", "Septembre", "Octobre", "Novembre", "D\xe9cembre"],
        monthsShort: ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"],
        today: "Aujourd'hui"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.hr = {
        days: ["Nedjelja", "Ponedjelja", "Utorak", "Srijeda", "\u010cetrtak", "Petak", "Subota", "Nedjelja"],
        daysShort: ["Ned", "Pon", "Uto", "Srr", "\u010cet", "Pet", "Sub", "Ned"],
        daysMin: ["Ne", "Po", "Ut", "Sr", "\u010ce", "Pe", "Su", "Ne"],
        months: ["Sije\u010danj", "Velja\u010da", "O\u017eujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"],
        monthsShort: ["Sije", "Velj", "O\u017eu", "Tra", "Svi", "Lip", "Jul", "Kol", "Ruj", "Lis", "Stu", "Pro"],
        today: "Danas"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.hu = {
        days: ["Vas\xe1rnap", "H\xe9tf\u0151", "Kedd", "Szerda", "Cs\xfct\xf6rt\xf6k", "P\xe9ntek", "Szombat", "Vas\xe1rnap"],
        daysShort: ["Vas", "H\xe9t", "Ked", "Sze", "Cs\xfc", "P\xe9n", "Szo", "Vas"],
        daysMin: ["V", "H", "K", "Sze", "Cs", "P", "Szo", "V"],
        months: ["Janu\xe1r", "Febru\xe1r", "M\xe1rcius", "\xc1prilis", "M\xe1jus", "J\xfanius", "J\xfalius", "Augusztus", "Szeptember", "Okt\xf3ber", "November", "December"],
        monthsShort: ["Jan", "Feb", "M\xe1r", "\xc1pr", "M\xe1j", "J\xfan", "J\xfal", "Aug", "Sze", "Okt", "Nov", "Dec"],
        today: "Ma"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.id = {
        days: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
        daysShort: ["Mgu", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Mgu"],
        daysMin: ["Mg", "Sn", "Sl", "Ra", "Ka", "Ju", "Sa", "Mg"],
        months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"]
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.is = {
        days: ["Sunnudagur", "M\xe1nudagur", "\xderi\xf0judagur", "Mi\xf0vikudagur", "Fimmtudagur", "F\xf6studagur", "Laugardagur", "Sunnudagur"],
        daysShort: ["Sun", "M\xe1n", "\xderi", "Mi\xf0", "Fim", "F\xf6s", "Lau", "Sun"],
        daysMin: ["Su", "M\xe1", "\xder", "Mi", "Fi", "F\xf6", "La", "Su"],
        months: ["Jan\xfaar", "Febr\xfaar", "Mars", "Apr\xedl", "Ma\xed", "J\xfan\xed", "J\xfal\xed", "\xc1g\xfast", "September", "Okt\xf3ber", "N\xf3vember", "Desember"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Ma\xed", "J\xfan", "J\xfal", "\xc1g\xfa", "Sep", "Okt", "N\xf3v", "Des"],
        today: "\xcd Dag"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.it = {
        days: ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"],
        daysShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
        daysMin: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"],
        months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
        monthsShort: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
        today: "Oggi"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.ja = {
        days: ["\u65e5\u66dc", "\u6708\u66dc", "\u706b\u66dc", "\u6c34\u66dc", "\u6728\u66dc", "\u91d1\u66dc", "\u571f\u66dc", "\u65e5\u66dc"],
        daysShort: ["\u65e5", "\u6708", "\u706b", "\u6c34", "\u6728", "\u91d1", "\u571f", "\u65e5"],
        daysMin: ["\u65e5", "\u6708", "\u706b", "\u6c34", "\u6728", "\u91d1", "\u571f", "\u65e5"],
        months: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
        monthsShort: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"]
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.kr = {
        days: ["\uc77c\uc694\uc77c", "\uc6d4\uc694\uc77c", "\ud654\uc694\uc77c", "\uc218\uc694\uc77c", "\ubaa9\uc694\uc77c", "\uae08\uc694\uc77c", "\ud1a0\uc694\uc77c", "\uc77c\uc694\uc77c"],
        daysShort: ["\uc77c", "\uc6d4", "\ud654", "\uc218", "\ubaa9", "\uae08", "\ud1a0", "\uc77c"],
        daysMin: ["\uc77c", "\uc6d4", "\ud654", "\uc218", "\ubaa9", "\uae08", "\ud1a0", "\uc77c"],
        months: ["1\uc6d4", "2\uc6d4", "3\uc6d4", "4\uc6d4", "5\uc6d4", "6\uc6d4", "7\uc6d4", "8\uc6d4", "9\uc6d4", "10\uc6d4", "11\uc6d4", "12\uc6d4"],
        monthsShort: ["1\uc6d4", "2\uc6d4", "3\uc6d4", "4\uc6d4", "5\uc6d4", "6\uc6d4", "7\uc6d4", "8\uc6d4", "9\uc6d4", "10\uc6d4", "11\uc6d4", "12\uc6d4"]
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.lt = {
        days: ["Sekmadienis", "Pirmadienis", "Antradienis", "Tre\u010diadienis", "Ketvirtadienis", "Penktadienis", "\u0160e\u0161tadienis", "Sekmadienis"],
        daysShort: ["S", "Pr", "A", "T", "K", "Pn", "\u0160", "S"],
        daysMin: ["Sk", "Pr", "An", "Tr", "Ke", "Pn", "\u0160t", "Sk"],
        months: ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegu\u017e\u0117", "Bir\u017eelis", "Liepa", "Rugpj\u016btis", "Rugs\u0117jis", "Spalis", "Lapkritis", "Gruodis"],
        monthsShort: ["Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rugp", "Rugs", "Spa", "Lap", "Gru"],
        today: "\u0160iandien",
        weekStart: 1
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.lv = {
        days: ["Sv\u0113tdiena", "Pirmdiena", "Otrdiena", "Tre\u0161diena", "Ceturtdiena", "Piektdiena", "Sestdiena", "Sv\u0113tdiena"],
        daysShort: ["Sv", "P", "O", "T", "C", "Pk", "S", "Sv"],
        daysMin: ["Sv", "Pr", "Ot", "Tr", "Ce", "Pk", "St", "Sv"],
        months: ["Janv\u0101ris", "Febru\u0101ris", "Marts", "Apr\u012blis", "Maijs", "J\u016bnijs", "J\u016blijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mai", "J\u016bn", "J\u016bl", "Aug", "Sep", "Okt", "Nov", "Dec."],
        today: "\u0160odien",
        weekStart: 1
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.ms = {
        days: ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu", "Ahad"],
        daysShort: ["Aha", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab", "Aha"],
        daysMin: ["Ah", "Is", "Se", "Ra", "Kh", "Ju", "Sa", "Ah"],
        months: ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis"],
        today: "Hari Ini"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.nb = {
        days: ["S\xf8ndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "L\xf8rdag", "S\xf8ndag"],
        daysShort: ["S\xf8n", "Man", "Tir", "Ons", "Tor", "Fre", "L\xf8r", "S\xf8n"],
        daysMin: ["S\xf8", "Ma", "Ti", "On", "To", "Fr", "L\xf8", "S\xf8"],
        months: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
        today: "I Dag"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.nl = {
        days: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
        daysShort: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
        daysMin: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
        months: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
        today: "Vandaag"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.pl = {
        days: ["Niedziela", "Poniedzia\u0142ek", "Wtorek", "\u015aroda", "Czwartek", "Pi\u0105tek", "Sobota", "Niedziela"],
        daysShort: ["Nie", "Pn", "Wt", "\u015ar", "Czw", "Pt", "So", "Nie"],
        daysMin: ["N", "Pn", "Wt", "\u015ar", "Cz", "Pt", "So", "N"],
        months: ["Stycze\u0144", "Luty", "Marzec", "Kwiecie\u0144", "Maj", "Czerwiec", "Lipiec", "Sierpie\u0144", "Wrzesie\u0144", "Pa\u017adziernik", "Listopad", "Grudzie\u0144"],
        monthsShort: ["Sty", "Lu", "Mar", "Kw", "Maj", "Cze", "Lip", "Sie", "Wrz", "Pa", "Lis", "Gru"],
        today: "Dzisiaj",
        weekStart: 1
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates["pt-BR"] = {
        days: ["Domingo", "Segunda", "Ter\xe7a", "Quarta", "Quinta", "Sexta", "S\xe1bado", "Domingo"],
        daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xe1b", "Dom"],
        daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
        months: ["Janeiro", "Fevereiro", "Mar\xe7o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        today: "Hoje"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.pt = {
        days: ["Domingo", "Segunda", "Ter\xe7a", "Quarta", "Quinta", "Sexta", "S\xe1bado", "Domingo"],
        daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xe1b", "Dom"],
        daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
        months: ["Janeiro", "Fevereiro", "Mar\xe7o", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.ro = {
        days: ["Duminic\u0103", "Luni", "Mar\u0163i", "Miercuri", "Joi", "Vineri", "S\xe2mb\u0103t\u0103", "Duminic\u0103"],
        daysShort: ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "S\xe2m", "Dum"],
        daysMin: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "S\xe2", "Du"],
        months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
        monthsShort: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        today: "Ast\u0103zi",
        weekStart: 1
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates["rs-latin"] = {
        days: ["Nedelja", "Ponedeljak", "Utorak", "Sreda", "\u010cetvrtak", "Petak", "Subota", "Nedelja"],
        daysShort: ["Ned", "Pon", "Uto", "Sre", "\u010cet", "Pet", "Sub", "Ned"],
        daysMin: ["N", "Po", "U", "Sr", "\u010c", "Pe", "Su", "N"],
        months: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
        today: "Danas"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.rs = {
        days: ["\u041d\u0435\u0434\u0435\u0459\u0430", "\u041f\u043e\u043d\u0435\u0434\u0435\u0459\u0430\u043a", "\u0423\u0442\u043e\u0440\u0430\u043a", "\u0421\u0440\u0435\u0434\u0430", "\u0427\u0435\u0442\u0432\u0440\u0442\u0430\u043a", "\u041f\u0435\u0442\u0430\u043a", "\u0421\u0443\u0431\u043e\u0442\u0430", "\u041d\u0435\u0434\u0435\u0459\u0430"],
        daysShort: ["\u041d\u0435\u0434", "\u041f\u043e\u043d", "\u0423\u0442\u043e", "\u0421\u0440\u0435", "\u0427\u0435\u0442", "\u041f\u0435\u0442", "\u0421\u0443\u0431", "\u041d\u0435\u0434"],
        daysMin: ["\u041d", "\u041f\u043e", "\u0423", "\u0421\u0440", "\u0427", "\u041f\u0435", "\u0421\u0443", "\u041d"],
        months: ["\u0408\u0430\u043d\u0443\u0430\u0440", "\u0424\u0435\u0431\u0440\u0443\u0430\u0440", "\u041c\u0430\u0440\u0442", "\u0410\u043f\u0440\u0438\u043b", "\u041c\u0430\u0458", "\u0408\u0443\u043d", "\u0408\u0443\u043b", "\u0410\u0432\u0433\u0443\u0441\u0442", "\u0421\u0435\u043f\u0442\u0435\u043c\u0431\u0430\u0440", "\u041e\u043a\u0442\u043e\u0431\u0430\u0440", "\u041d\u043e\u0432\u0435\u043c\u0431\u0430\u0440", "\u0414\u0435\u0446\u0435\u043c\u0431\u0430\u0440"],
        monthsShort: ["\u0408\u0430\u043d", "\u0424\u0435\u0431", "\u041c\u0430\u0440", "\u0410\u043f\u0440", "\u041c\u0430\u0458", "\u0408\u0443\u043d", "\u0408\u0443\u043b", "\u0410\u0432\u0433", "\u0421\u0435\u043f", "\u041e\u043a\u0442", "\u041d\u043e\u0432", "\u0414\u0435\u0446"],
        today: "\u0414\u0430\u043d\u0430\u0441"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.ru = {
        days: ["\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435", "\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a", "\u0412\u0442\u043e\u0440\u043d\u0438\u043a", "\u0421\u0440\u0435\u0434\u0430", "\u0427\u0435\u0442\u0432\u0435\u0440\u0433", "\u041f\u044f\u0442\u043d\u0438\u0446\u0430", "\u0421\u0443\u0431\u0431\u043e\u0442\u0430", "\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435"],
        daysShort: ["\u0412\u0441\u043a", "\u041f\u043d\u0434", "\u0412\u0442\u0440", "\u0421\u0440\u0434", "\u0427\u0442\u0432", "\u041f\u0442\u043d", "\u0421\u0443\u0431", "\u0412\u0441\u043a"],
        daysMin: ["\u0412\u0441", "\u041f\u043d", "\u0412\u0442", "\u0421\u0440", "\u0427\u0442", "\u041f\u0442", "\u0421\u0431", "\u0412\u0441"],
        months: ["\u042f\u043d\u0432\u0430\u0440\u044c", "\u0424\u0435\u0432\u0440\u0430\u043b\u044c", "\u041c\u0430\u0440\u0442", "\u0410\u043f\u0440\u0435\u043b\u044c", "\u041c\u0430\u0439", "\u0418\u044e\u043d\u044c", "\u0418\u044e\u043b\u044c", "\u0410\u0432\u0433\u0443\u0441\u0442", "\u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c", "\u041e\u043a\u0442\u044f\u0431\u0440\u044c", "\u041d\u043e\u044f\u0431\u0440\u044c", "\u0414\u0435\u043a\u0430\u0431\u0440\u044c"],
        monthsShort: ["\u042f\u043d\u0432", "\u0424\u0435\u0432", "\u041c\u0430\u0440", "\u0410\u043f\u0440", "\u041c\u0430\u0439", "\u0418\u044e\u043d", "\u0418\u044e\u043b", "\u0410\u0432\u0433", "\u0421\u0435\u043d", "\u041e\u043a\u0442", "\u041d\u043e\u044f", "\u0414\u0435\u043a"],
        today: "\u0421\u0435\u0433\u043e\u0434\u043d\u044f"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.sk = {
        days: ["Nede\u013ea", "Pondelok", "Utorok", "Streda", "\u0160tvrtok", "Piatok", "Sobota", "Nede\u013ea"],
        daysShort: ["Ne", "Po", "Ut", "St", "\u0160t", "Pi", "So", "Ne"],
        daysMin: ["Ne", "Po", "Ut", "St", "\u0160t", "Pi", "So", "Ne"],
        months: ["Janu\xe1r", "Febru\xe1r", "Marec", "Apr\xedl", "M\xe1j", "J\xfan", "J\xfal", "August", "September", "Okt\xf3ber", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "M\xe1j", "J\xfan", "J\xfal", "Aug", "Sep", "Okt", "Nov", "Dec"],
        today: "Dnes"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.sl = {
        days: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "\u010cetrtek", "Petek", "Sobota", "Nedelja"],
        daysShort: ["Ned", "Pon", "Tor", "Sre", "\u010cet", "Pet", "Sob", "Ned"],
        daysMin: ["Ne", "Po", "To", "Sr", "\u010ce", "Pe", "So", "Ne"],
        months: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
        today: "Danes"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.sv = {
        days: ["S\xf6ndag", "M\xe5ndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "L\xf6rdag", "S\xf6ndag"],
        daysShort: ["S\xf6n", "M\xe5n", "Tis", "Ons", "Tor", "Fre", "L\xf6r", "S\xf6n"],
        daysMin: ["S\xf6", "M\xe5", "Ti", "On", "To", "Fr", "L\xf6", "S\xf6"],
        months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
        today: "I Dag"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.th = {
        days: ["\u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c", "\u0e08\u0e31\u0e19\u0e17\u0e23\u0e4c", "\u0e2d\u0e31\u0e07\u0e04\u0e32\u0e23", "\u0e1e\u0e38\u0e18", "\u0e1e\u0e24\u0e2b\u0e31\u0e2a", "\u0e28\u0e38\u0e01\u0e23\u0e4c", "\u0e40\u0e2a\u0e32\u0e23\u0e4c", "\u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c"],
        daysShort: ["\u0e2d\u0e32", "\u0e08", "\u0e2d", "\u0e1e", "\u0e1e\u0e24", "\u0e28", "\u0e2a", "\u0e2d\u0e32"],
        daysMin: ["\u0e2d\u0e32", "\u0e08", "\u0e2d", "\u0e1e", "\u0e1e\u0e24", "\u0e28", "\u0e2a", "\u0e2d\u0e32"],
        months: ["\u0e21\u0e01\u0e23\u0e32\u0e04\u0e21", "\u0e01\u0e38\u0e21\u0e20\u0e32\u0e1e\u0e31\u0e19\u0e18\u0e4c", "\u0e21\u0e35\u0e19\u0e32\u0e04\u0e21", "\u0e40\u0e21\u0e29\u0e32\u0e22\u0e19", "\u0e1e\u0e24\u0e29\u0e20\u0e32\u0e04\u0e21", "\u0e21\u0e34\u0e16\u0e38\u0e19\u0e32\u0e22\u0e19", "\u0e01\u0e23\u0e01\u0e0e\u0e32\u0e04\u0e21", "\u0e2a\u0e34\u0e07\u0e2b\u0e32\u0e04\u0e21", "\u0e01\u0e31\u0e19\u0e22\u0e32\u0e22\u0e19", "\u0e15\u0e38\u0e25\u0e32\u0e04\u0e21", "\u0e1e\u0e24\u0e28\u0e08\u0e34\u0e01\u0e32\u0e22\u0e19", "\u0e18\u0e31\u0e19\u0e27\u0e32\u0e04\u0e21"],
        monthsShort: ["\u0e21.\u0e04.", "\u0e01.\u0e1e.", "\u0e21\u0e35.\u0e04.", "\u0e40\u0e21.\u0e22.", "\u0e1e.\u0e04.", "\u0e21\u0e34.\u0e22.", "\u0e01.\u0e04.", "\u0e2a.\u0e04.", "\u0e01.\u0e22.", "\u0e15.\u0e04.", "\u0e1e.\u0e22.", "\u0e18.\u0e04."],
        today: "\u0e27\u0e31\u0e19\u0e19\u0e35\u0e49"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates.tr = {
        days: ["Pazar", "Pazartesi", "Sal\u0131", "\xc7ar\u015famba", "Per\u015fembe", "Cuma", "Cumartesi", "Pazar"],
        daysShort: ["Pz", "Pzt", "Sal", "\xc7r\u015f", "Pr\u015f", "Cu", "Cts", "Pz"],
        daysMin: ["Pz", "Pzt", "Sa", "\xc7r", "Pr", "Cu", "Ct", "Pz"],
        months: ["Ocak", "\u015eubat", "Mart", "Nisan", "May\u0131s", "Haziran", "Temmuz", "A\u011fustos", "Eyl\xfcl", "Ekim", "Kas\u0131m", "Aral\u0131k"],
        monthsShort: ["Oca", "\u015eub", "Mar", "Nis", "May", "Haz", "Tem", "A\u011fu", "Eyl", "Eki", "Kas", "Ara"],
        today: "Bug\xfcn"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates["zh-CN"] = {
        days: ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d", "\u661f\u671f\u65e5"],
        daysShort: ["\u5468\u65e5", "\u5468\u4e00", "\u5468\u4e8c", "\u5468\u4e09", "\u5468\u56db", "\u5468\u4e94", "\u5468\u516d", "\u5468\u65e5"],
        daysMin: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u65e5"],
        months: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
        monthsShort: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
        today: "\u4eca\u65e5"
    }
}(jQuery), function (t) {
    t.fn.datetimepicker.dates["zh-TW"] = {
        days: ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d", "\u661f\u671f\u65e5"],
        daysShort: ["\u5468\u65e5", "\u5468\u4e00", "\u5468\u4e8c", "\u5468\u4e09", "\u5468\u56db", "\u5468\u4e94", "\u5468\u516d", "\u5468\u65e5"],
        daysMin: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d", "\u65e5"],
        months: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
        monthsShort: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"]
    }
}(jQuery), /*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
    function (t, e) {
        var i, n = t.jQuery || t.Cowboy || (t.Cowboy = {});
        n.throttle = i = function (t, i, a, r) {
            function s() {
                function n() {
                    d = +new Date, a.apply(l, c)
                }

                function s() {
                    o = e
                }

                var l = this, u = +new Date - d, c = arguments;
                r && !o && n(), o && clearTimeout(o), r === e && u > t ? n() : i !== !0 && (o = setTimeout(r ? s : n, r === e ? t - u : t))
            }

            var o, d = 0;
            return "boolean" != typeof i && (r = a, a = i, i = e), n.guid && (s.guid = a.guid = a.guid || n.guid++), s
        }, n.debounce = function (t, n, a) {
            return a === e ? i(t, n, !1) : i(t, a, n !== !1)
        }
    }(this), /*!
 * JQuery Spliter Plugin
 * Copyright (C) 2010-2013 Jakub Jankiewicz <http://jcubic.pl>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
    function (t, e) {
        var i = 0, n = null, a = [], r = null;
        t.fn.split = function (s) {
            function o(t) {
                if ("number" == typeof t)return t;
                if ("string" == typeof t) {
                    var e = t.match(/^([0-9]+)(px|%)$/);
                    if (e) {
                        if ("px" == e[2])return +e[1];
                        if ("vertical" == c.orientation)return m * +e[1] / 100;
                        if ("horizontal" == c.orientation)return f * +e[1] / 100
                    }
                }
            }

            var d = this.data("splitter");
            if (d)return d;
            var l, u, c = t.extend({
                limit: 100,
                orientation: "horizontal",
                position: "50%",
                invisible: !1,
                onDragStart: t.noop,
                onDragEnd: t.noop,
                onDrag: t.noop
            }, s || {});
            this.settings = c;
            var h, p = this.children();
            "vertical" == c.orientation ? (l = p.first().addClass("left_panel"), u = l.next().addClass("right_panel"), h = "vsplitter") : "horizontal" == c.orientation && (l = p.first().addClass("top_panel"), u = l.next().addClass("bottom_panel"), h = "hsplitter"), c.invisible && (h += " splitter-invisible");
            var m = this.width(), f = this.height(), g = i++;
            this.addClass("splitter_panel");
            var v, $ = t("<div/>").addClass(h).bind("mouseenter touchstart", function () {
                n = g
            }).bind("mouseleave touchend", function () {
                n = null
            }).insertAfter(l), b = t.extend(this, {
                refresh: function () {
                    var t = this.width(), e = this.height();
                    (m != t || f != e) && (m = this.width(), f = this.height(), b.position(v))
                }, position: function () {
                    return "vertical" == c.orientation ? function (t, i) {
                        if (t === e)return v;
                        v = o(t);
                        var n = $.width(), a = n / 2;
                        if (c.invisible) {
                            var r = l.width(v).outerWidth();
                            u.width(b.width() - r), $.css("left", r - a)
                        } else {
                            var r = l.width(v - a).outerWidth();
                            u.width(b.width() - r - n), $.css("left", r)
                        }
                        return i || b.find(".splitter_panel").trigger("splitter.resize"), b
                    } : "horizontal" == c.orientation ? function (t, i) {
                        if (t === e)return v;
                        v = o(t);
                        var n = $.height(), a = n / 2;
                        if (c.invisible) {
                            var r = l.height(v).outerHeight();
                            u.height(b.height() - r), $.css("top", r - a)
                        } else {
                            var r = l.height(v - a).outerHeight();
                            u.height(b.height() - r - n), $.css("top", r)
                        }
                        return i || b.find(".splitter_panel").trigger("splitter.resize"), b
                    } : t.noop
                }(), orientation: c.orientation, limit: c.limit, isActive: function () {
                    return n === g
                }, destroy: function () {
                    b.removeClass("splitter_panel"), $.unbind("mouseenter"), $.unbind("mouseleave"), $.unbind("touchstart"), $.unbind("touchmove"), $.unbind("touchend"), $.unbind("touchleave"), $.unbind("touchcancel"), "vertical" == c.orientation ? (l.removeClass("left_panel"), u.removeClass("right_panel")) : "horizontal" == c.orientation && (l.removeClass("top_panel"), u.removeClass("bottom_panel")), b.unbind("splitter.resize"), b.find(".splitter_panel").trigger("splitter.resize"), a[g] = null, $.remove();
                    for (var e = !1, n = a.length; n--;)if (null !== a[n]) {
                        e = !0;
                        break
                    }
                    e || (t(document.documentElement).unbind(".splitter"), t(window).unbind("resize.splitter"), b.data("splitter", null), a = [], i = 0)
                }
            });
            b.bind("splitter.resize", function () {
                var t = b.position();
                "vertical" == b.orientation && t > b.width() ? t = b.width() - b.limit - 1 : "horizontal" == b.orientation && t > b.height() && (t = b.height() - b.limit - 1), t < b.limit && (t = b.limit + 1), b.position(t, !0)
            });
            var _;
            return "vertical" == c.orientation ? _ = _ > m - c.limit ? m - c.limit : o(c.position) : "horizontal" == c.orientation && (_ = _ > f - c.limit ? f - c.limit : o(c.position)), _ < c.limit && (_ = c.limit), b.position(_, !0), 0 == a.length && (t(window).bind("resize.splitter", function () {
                t.each(a, function (t, e) {
                    e.refresh()
                })
            }), t(document.documentElement).bind("mousedown.splitter touchstart.splitter", function (e) {
                return null !== n ? (r = a[n], t('<div class="splitterMask"></div>').css("cursor", $.css("cursor")).insertAfter(r), r.settings.onDragStart(e), !1) : void 0
            }).bind("mouseup.splitter touchend.splitter touchleave.splitter touchcancel.splitter", function (e) {
                r && (t(".splitterMask").remove(), r.settings.onDragEnd(e), r = null)
            }).bind("mousemove.splitter touchmove.splitter", function (t) {
                if (null !== r) {
                    var e = r.limit, i = r.offset();
                    if ("vertical" == r.orientation) {
                        var n = t.pageX;
                        t.originalEvent && t.originalEvent.changedTouches && (n = t.originalEvent.changedTouches[0].pageX);
                        var a = n - i.left;
                        a <= r.limit ? a = r.limit + 1 : a >= r.width() - e && (a = r.width() - e - 1), a > r.limit && a < r.width() - e && (r.position(a, !0), r.find(".splitter_panel").trigger("splitter.resize"), t.preventDefault())
                    } else if ("horizontal" == r.orientation) {
                        var s = t.pageY;
                        t.originalEvent && t.originalEvent.changedTouches && (s = t.originalEvent.changedTouches[0].pageY);
                        var o = s - i.top;
                        o <= r.limit ? o = r.limit + 1 : o >= r.height() - e && (o = r.height() - e - 1), o > r.limit && o < r.height() - e && (r.position(o, !0), r.find(".splitter_panel").trigger("splitter.resize"), t.preventDefault())
                    }
                    r.settings.onDrag(t)
                }
            })), a.push(b), b.data("splitter", b), b
        }
    }(jQuery), function (t) {
    t.slidebars = function (e) {
        function i() {
            !l.disableOver || "number" == typeof l.disableOver && l.disableOver >= k ? (y = !0, t("html").addClass("sb-init"), l.hideControlClasses && S.removeClass("sb-hide"), n()) : "number" == typeof l.disableOver && l.disableOver < k && (y = !1, t("html").removeClass("sb-init"), l.hideControlClasses && S.addClass("sb-hide"), g.css("minHeight", ""), ($ || _) && s())
        }

        function n() {
            g.css("minHeight", ""), g.css("minHeight", t("html").height() + "px"), v && v.hasClass("sb-width-custom") && v.css("width", v.attr("data-sb-width")), b && b.hasClass("sb-width-custom") && b.css("width", b.attr("data-sb-width")), v && (v.hasClass("sb-style-push") || v.hasClass("sb-style-overlay")) && v.css("marginLeft", "-" + v.css("width")), b && (b.hasClass("sb-style-push") || b.hasClass("sb-style-overlay")) && b.css("marginRight", "-" + b.css("width")), l.scrollLock && t("html").addClass("sb-scroll-lock")
        }

        function a(t, e, i) {
            var a;
            if (a = t.hasClass("sb-style-push") ? g.add(t).add(w) : t.hasClass("sb-style-overlay") ? t : g.add(w), "translate" === F)a.css("transform", "translate(" + e + ")"); else if ("side" === F)"-" === e[0] && (e = e.substr(1)), "0px" !== e && a.css(i, "0px"), setTimeout(function () {
                a.css(i, e)
            }, 1); else if ("jQuery" === F) {
                "-" === e[0] && (e = e.substr(1));
                var r = {};
                r[i] = e, a.stop().animate(r, 400)
            }
            setTimeout(function () {
                "0px" === e && (a.removeAttr("style"), n())
            }, 400)
        }

        function r(e) {
            function i() {
                y && "left" === e && v ? (t("html").addClass("sb-active sb-active-left"), v.addClass("sb-active"), a(v, v.css("width"), "left"), setTimeout(function () {
                    $ = !0
                }, 400)) : y && "right" === e && b && (t("html").addClass("sb-active sb-active-right"), b.addClass("sb-active"), a(b, "-" + b.css("width"), "right"), setTimeout(function () {
                    _ = !0
                }, 400))
            }

            "left" === e && v && _ || "right" === e && b && $ ? (s(), setTimeout(i, 400)) : i()
        }

        function s(e) {
            ($ || _) && ($ && (a(v, "0px", "left"), $ = !1), _ && (a(b, "0px", "right"), _ = !1), setTimeout(function () {
                t("html").removeClass("sb-active sb-active-left sb-active-right"), v && v.removeClass("sb-active"), b && b.removeClass("sb-active"), "undefined" != typeof e && (window.location = e)
            }, 400))
        }

        function o(t) {
            "left" === t && v && ($ ? s() : r("left")), "right" === t && b && (_ ? s() : r("right"))
        }

        function d(t, e) {
            t.stopPropagation(), t.preventDefault(), "touchend" === t.type && e.off("click")
        }

        var l = t.extend({
            siteClose: !0,
            scrollLock: !1,
            disableOver: !1,
            hideControlClasses: !1
        }, e), u = document.createElement("div").style, c = !1, h = !1;
        ("" === u.MozTransition || "" === u.WebkitTransition || "" === u.OTransition || "" === u.transition) && (c = !0), ("" === u.MozTransform || "" === u.WebkitTransform || "" === u.OTransform || "" === u.transform) && (h = !0);
        var p = navigator.userAgent, m = !1, f = !1;
        /Android/.test(p) ? m = p.substr(p.indexOf("Android") + 8, 3) : /(iPhone|iPod|iPad)/.test(p) && (f = p.substr(p.indexOf("OS ") + 3, 3).replace("_", ".")), (m && 3 > m || f && 5 > f) && t("html").addClass("sb-static");
        var g = t("#sb-site, .sb-site-container");
        if (t(".sb-left").length)var v = t(".sb-left"), $ = !1;
        if (t(".sb-right").length)var b = t(".sb-right"), _ = !1;
        var y = !1, k = t(window).width(), S = t(".sb-toggle-left, .sb-toggle-right, .sb-open-left, .sb-open-right, .sb-close"), w = t(".sb-slide");
        i(), t(window).resize(function () {
            var e = t(window).width();
            k !== e && (k = e, i(), $ && r("left"), _ && r("right"))
        });
        var F;
        c && h ? (F = "translate", m && 4.4 > m && (F = "side")) : F = "jQuery", this.slidebars = {
            open: r,
            close: s,
            toggle: o,
            init: function () {
                return y
            },
            active: function (t) {
                return "left" === t && v ? $ : "right" === t && b ? _ : void 0
            },
            destroy: function (t) {
                "left" === t && v && ($ && s(), setTimeout(function () {
                    v.remove(), v = !1
                }, 400)), "right" === t && b && (_ && s(), setTimeout(function () {
                    b.remove(), b = !1
                }, 400))
            }
        }, t(".sb-toggle-left").on("touchend click", function (e) {
            d(e, t(this)), o("left")
        }), t(".sb-toggle-right").on("touchend click", function (e) {
            d(e, t(this)), o("right")
        }), t(".sb-open-left").on("touchend click", function (e) {
            d(e, t(this)), r("left")
        }), t(".sb-open-right").on("touchend click", function (e) {
            d(e, t(this)), r("right")
        }), t(".sb-close").on("touchend click", function (e) {
            if (t(this).is("a") || t(this).children().is("a")) {
                if ("click" === e.type) {
                    e.preventDefault();
                    var i = t(this).is("a") ? t(this).attr("href") : t(this).find("a").attr("href");
                    s(i)
                }
            } else d(e, t(this)), s()
        }), g.on("touchend click", function (e) {
            l.siteClose && ($ || _) && (d(e, t(this)), s())
        })
    }
}(jQuery), function () {
    $(function () {
        var t, e, i, n;
        return $(document).on("click", "#auto_submodels .pagination a", function () {
            return $.getScript(this.href), !1
        }), $("#auto_submodels_search input").keyup($.debounce(1e3, function () {
            return $.get($("#auto_submodels_search").attr("action"), $("#auto_submodels_search").serialize(), null, "script"), !1
        })), window.part_match_rules = "", n = function (t, e, i) {
            var n;
            return n = "", t.find(e).children().each(function () {
                return $(this).is("a") && (n += $(this).text() + ";"), $(this).is("span.tooltip") ? window.part_match_rules += $(this).prev().text() + ": " + $(this).children("span.tooltip-content").text() + "\r\n" : void 0
            }), i.val(n)
        }, i = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()), i || $("#ajax-message").text($("#chrome-not-used").text()), $("#catalog-frame").load(function () {
            var t;
            return t = $(this).contents().find("tr.model td:first-child"), $.each(t, function () {
                return $(this).append($('<div class="copy-btn-div" style="display: none;"><button class="copy-btn">' + $("#copy-btn-text").text() + "</button></div>")).click(function () {
                    return $("#auto_submodel_engine_displacement").val($(this).parent().children("td:nth-child(2)").text()), $("#auto_submodel_engine_model").val($(this).parent().children("td:nth-child(4)").html().replace(/<br>/g, ";")), window.part_match_rules = "", n($(this).parent(), "td:nth-child(6)", $("#hengst_oil_filter")), n($(this).parent(), "td:nth-child(7)", $("#hengst_fuel_filter")), n($(this).parent(), "td:nth-child(8)", $("#hengst_air_filter")), n($(this).parent(), "td:nth-child(9)", $("#hengst_cabin_filter")), $("#auto_submodel_match_rule").val(window.part_match_rules)
                }), $(this).parent().hover(function () {
                    return $(this).parent().find("div.copy-btn-div").hide(), $(this).find("div.copy-btn-div").show()
                })
            })
        }), $("#submit-form-btn").click(function () {
            return $("form").submit(), !1
        }), $("#asm_brand").length > 0 && (t = {}, e = {}, $.getJSON("/auto_brands.json", {all: 1}, function (i) {
            var n, a, r, s, o, d, l, u, c, h, p, m, f, g, v;
            for (s = 0, u = i.length; u > s; s++)for (n = i[s], $("#asm_brand").append($('<option value="' + n._id + '">' + n.name + "</option>")), t[n._id] = n.ams, m = n.ams, o = 0, c = m.length; c > o; o++)a = m[o], e[a._id] = a.asms;
            for (f = i[0].ams, d = 0, h = f.length; h > d; d++)a = f[d], $("#asm_model").append($('<option value="' + a._id + '">' + a.name + "</option>"));
            for (g = i[0].ams[0].asms, v = [], l = 0, p = g.length; p > l; l++)r = g[l], v.push($("#asm_submodel").append($('<option value="' + r._id + '">' + r.name + "</option>")));
            return v
        }), $("#asm_brand").change(function () {
            var i, n, a, r, s, o, d, l, u;
            for ($("#asm_model").html(""), $("#asm_submodel").html(""), d = t[$(this).val()], a = 0, s = d.length; s > a; a++)i = d[a], $("#asm_model").append($('<option value="' + i._id + '">' + i.name + "</option>"));
            for (l = e[$("#asm_model").val()], u = [], r = 0, o = l.length; o > r; r++)n = l[r], u.push($("#asm_submodel").append($('<option value="' + n._id + '">' + n.name + "</option>")));
            return u
        }), $("#asm_model").change(function () {
            var t, i, n, a, r;
            for ($("#asm_submodel").html(""), a = e[$(this).val()], r = [], i = 0, n = a.length; n > i; i++)t = a[i], r.push($("#asm_submodel").append($('<option value="' + t._id + '">' + t.name + "</option>")));
            return r
        })), $("#add_alike_asms").submit(function () {
            var t;
            return t = $("#" + $("#asm_submodel").val()), t.length > 0 ? (alert("\u76f8\u4f3c\u8f66\u578b\u5df2\u7ecf\u5b58\u5728"), t.fadeOut().fadeIn(), !1) : void 0
        })
    })
}.call(this), function () {
    $(function () {
        return $(document).on("click", "#autos .pagination a", function () {
            return $.getScript(this.href), !1
        }), $("#autos_search input").keyup($.debounce(1e3, function () {
            return $.get($("#autos_search").attr("action"), $("#autos_search").serialize(), null, "script"), !1
        })), $("#auto_model_brand_id, #auto_submodel_model_id, #auto_auto_model, #service_type_auto_brand_id").change(function () {
            return $.get($(this).attr("rel") + "/" + $(this).val(), {
                data_source: $(this).data("source"),
                nolist: $(this).data("nolist")
            }, null, "script")
        }), $(document).ajaxSend(function () {
            return $(".loading-indicator").show(), $("#progress-dialog").modal("toggle")
        }), $(document).ajaxComplete(function () {
            return $(".loading-indicator").hide(), $("#progress-dialog").modal("toggle")
        })
    })
}.call(this), function () {
    jQuery(function () {
        return $("a[rel~=popover], .has-popover").popover(), $("a[rel~=tooltip], .has-tooltip").tooltip()
    })
}.call(this), function () {
    $(function () {
        return $("form[id^=edit_city]").validate()
    })
}.call(this), function () {
    $(function () {
        return $("#complainted_role").change(function () {
            return "" !== $("#complainted_role").val() && $.getScript("/users?role=" + $("#complainted_role").val() + "&city=" + $("#complaint_city_id").val()), !1
        }), $("#complaint_city_id").change(function () {
            return "" !== $("#complaint_city_id").val() && $.getScript("/users?complaint_handler=10&role=" + $("#complainted_role").val() + "&city=" + $("#complaint_city_id").val()), !1
        })
    })
}.call(this), function () {
    $(function () {
        return $("#new_discount").validate()
    })
}.call(this), function () {
    $(function () {
        var t;
        return t = function () {
            return $(".editable").jinplace({
                cancelButton: "\u53d6\u6d88",
                okButton: "\u786e\u5b9a",
                placeholder: "\u70b9\u51fb\u4fee\u6539",
                submitFunction: function (t, e) {
                    return $.ajax(t.url, {type: "post", data: {value: e}, dataType: "script"}).fail(function (t) {
                        return 400 === t.status ? alert(t.responseText) : 406 === t.status ? window.location.href = "/users/sign_in" : void 0
                    })
                }
            })
        }, $(document).ajaxComplete(function () {
            return t()
        }), t()
    })
}.call(this), function () {
}.call(this), $(function () {
    $(".btn-invoiced").on("click", function () {
        initBtn($(this).attr("id"), "invoiced")
    }), $(".btn-apply").on("click", function () {
        initBtn($(this).attr("id"), "apply")
    })
}), function () {
    $(function () {
        return $("#new_maintain, form[id^=edit_maintain]").validate({
            errorPlacement: function (t, e) {
                return t.css("color", "#FF0000"), t.insertAfter(e)
            }
        })
    })
}.call(this), function () {
    $(function () {
        return $("#btn-move-up").click(function () {
            var t;
            return t = $("#motoroil_group_part_ids option:selected"), t.length ? t.first().prev().before(t) : void 0
        }), $("#btn-move-down").click(function () {
            var t;
            return t = $("#motoroil_group_part_ids option:selected"), t.length ? t.last().next().after(t) : void 0
        }), $("#btn-move-right").click(function () {
            return $("#motoroil_part_ids option:selected").appendTo("#motoroil_group_part_ids")
        }), $("#btn-move-left").click(function () {
            return $("#motoroil_group_part_ids option:selected").appendTo("#motoroil_part_ids")
        }), $(".form-for-motoroil-group").submit(function () {
            return $("#motoroil_group_part_ids option").prop("selected", !0)
        })
    })
}.call(this), function () {
    $(function () {
        var t;
        return $(document).on("change", "#notification_msg_type", function () {
            var e;
            return e = $(this).val(), t(e)
        }), (t = function (t) {
            return $("#notification_msg_type").val() ? ($(".msg_recerver").hide(), $("#msg_recerver_" + t).show()) : void 0
        })($("#notification_msg_type").val())
    })
}.call(this), function () {
    $(function () {
        var t, e, i, n, a, r, s, o, d, l, u, c, h, p, m, f, g, v, b, _, y, k, S, w, F, M, x, D, C;
        if (c = function (t) {
                return /^20\d{2}[-/]\d{2}[-/]\d{2} (([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/i.test(t)
            }, $.validator.addMethod("datetime", function (t, e) {
                return this.optional(e) || c(t)
            }, "\u65e0\u6548\u7684\u670d\u52a1\u65f6\u95f4"), $("#new_order, form[id^=edit_order]").validate({
                rules: {
                    "order[service_type_ids][]": {
                        required: !0,
                        minlength: 1
                    }, "order[serve_datetime]": "required datetime", "order[user_type_id]": {required: !0}
                }, errorPlacement: function (t, e) {
                    return t.css("color", "#FF0000"), t.insertAfter(e.is("input:checkbox") ? e.parents("table") : e)
                }, messages: {"order[service_type_ids][]": {required: $("#service-type-at-least-one").text()}}
            }), $(document).on("click", ".select-parts table tr td input:checkbox", function () {
                return $(this).data("multisel") || $(this).closest("table").find("input:checkbox").not(this).prop("checked", !1), $.post($("#calcprice-btn").prop("href"), $("#calcprice-btn").parents("form").serialize(), null, "script")
            }), $(document).on("click", "#select-service-types table tr td input:checkbox", function () {
                return $.post($("#calcprice-btn").prop("href"), $("#calcprice-btn").parents("form").serialize(), null, "script")
            }), $(document).on("keyup input", "input[name^='order[part_counts]']", $.debounce(1e3, function () {
                return $.post($("#calcprice-btn").prop("href"), $("#calcprice-btn").parents("form").serialize(), null, "script")
            })), $("#order_auto_submodel_id").change(function () {
                return $.getScript($(this).attr("rel") + "/" + $(this).val())
            }), $("#search-by-car-num").click(function () {
                return $("#order_car_num").val().length > 0 && $.getScript(this.href + "?car_location=" + $("#select-car-location").val() + "&car_num=" + $("#order_car_num").val()), !1
            }), $("#search-by-phone-num").click(function () {
                return $("#order_phone_num").val().length > 0 && $.getScript(this.href + "?phone_num=" + $("#order_phone_num").val()), !1
            }), $("#calcprice-btn").click(function () {
                return $.post(this.href, $(this).parents("form").serialize(), null, "script"), !1
            }), $("#verify-discount-num-btn").click(function () {
                return $("#order_discount_num").val().length > 0 && $.getScript(this.href + "?discount=" + $("#order_discount_num").val()), !1
            }), $("#view-client-discounts-btn").click(function () {
                return $.getScript(this.href + "?phone_num=" + $("#order_phone_num").val() + "&selected_token=" + $("#order_discount_num").val()), !1
            }), $(document).on("change", ".client_discount", function () {
                return $("#order_discount_num").val($(this).val()), $.post("/orders_calcprice", $(this).parents("form").serialize(), null, "script"), !1
            }), $("#car-model-search").length > 0 && (o = {}, r = [], $.getJSON("/auto_brands.json", {
                all: 1,
                pinyin: 1
            }, function (t) {
                var e, i, n, a, s, d;
                for (d = [], a = 0, s = t.length; s > a; a++)e = t[a], d.push(function () {
                    var t, a, s, d;
                    for (s = e.ams, d = [], t = 0, a = s.length; a > t; t++)i = s[t], d.push(function () {
                        var t, e, a, s;
                        for (a = i.asms, s = [], t = 0, e = a.length; e > t; t++)n = a[t], r.push(n), s.push(o[n.full_name] = n._id);
                        return s
                    }());
                    return d
                }());
                return d
            }), $("#car-model-search").typeahead({
                source: function (t) {
                    var e, i, n, a, s;
                    for (i = [], a = 0, s = r.length; s > a; a++)e = r[a], n = RegExp(t.split("").join(".*")), (-1 !== e.full_name.search(n) || -1 !== e.full_name_pinyin.search(n)) && i.push(e.full_name);
                    return i
                }, matcher: function () {
                    return !0
                }, highlighter: function (t) {
                    return "<strong>" + t + "</strong>"
                }, updater: function (t) {
                    return $.get("/auto_submodels/" + o[t], null, null, "script"), t
                }, items: 16, minLength: 2
            })), $("a.datetime-shortcut").click(function () {
                return $("#order_serve_datetime").val($(this).data("msg")), l()
            }), $("a.serve-datetime-shortcut").click(function () {
                return $("#serve_datetime_start").val($(this).data("msg")), $("#serve_datetime_end").val($(this).data("msg"))
            }), $("a.serve-datetime-clear").click(function () {
                return $("#serve_datetime_start").val(""), $("#serve_datetime_end").val("")
            }), $("a.created-at-shortcut").click(function () {
                return $("#created_at_start").val($(this).data("msg")), $("#created_at_end").val($(this).data("msg"))
            }), $("a.created-at-clear").click(function () {
                return $("#created_at_start").val(""), $("#created_at_end").val("")
            }), $(".form_datetime").datetimepicker({
                pickTime: !1,
                language: "zh-CN"
            }), $(".order-a").on("dragstart", function (t) {
                return t.originalEvent.dataTransfer.setData("text", $(t.originalEvent.target).closest("tr").attr("id"))
            }), $(".engineer-tr, .unassigned-orders, .daily-order-tr").on("dragover", function (t) {
                return t.preventDefault()
            }), M = function (t, e) {
                var i;
                return i = t.find(".badge"), null != i ? i.text(parseInt(i.text()) + e) : void 0
            }, a = function (t, e, i) {
                return null != i && i.is(e) ? void 0 : $.ajax({
                    url: "/orders/" + t.attr("id") + "/distribute",
                    type: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify({state: 3, engineer_id: e.attr("id")}),
                    dataType: "json",
                    success: function () {
                        var n;
                        if (null != i.get(0) ? (M($(i), -1), M($($(i).prevAll(".assigned-dianbu-tr")[0]), -1)) : M(t.prev(".dianbu-tr"), -1), M($(e), 1), M($($(e).prevAll(".assigned-dianbu-tr")[0]), 1), n = e.next("tr"), n.length > 0) {
                            for (; n.hasClass("daily-order-tr") && n.children("td.order-time").text() < t.children("td.order-time").text();)n = n.next("tr");
                            t.insertBefore(n)
                        } else t.insertAfter(e);
                        return t.data("label").setStyle({
                            color: "grey",
                            opacity: .5,
                            borderStyle: "dotted"
                        }), t.data("label").setZIndex(9)
                    },
                    error: function () {
                        return alert("Network error.")
                    }
                })
            }, $(".engineer-tr").on("drop", function (t) {
                var e, i;
                return t.preventDefault(), i = document.getElementById(t.originalEvent.dataTransfer.getData("text")), null != i && $(i).hasClass("daily-order-tr") ? (e = $($(i).prevAll("tr.engineer-tr")[0]), a($(i), $(this), e)) : void 0
            }), $(".daily-order-tr").on("drop", function (t) {
                var e, i, n;
                return t.preventDefault(), n = document.getElementById(t.originalEvent.dataTransfer.getData("text")), null != n && $(n).hasClass("daily-order-tr") ? $(this).closest("table").hasClass("unassigned-orders") ? void 0 : (e = $($(this).prevAll("tr.engineer-tr")[0]), i = $($(n).prevAll("tr.engineer-tr")[0]), a($(n), e, i)) : void 0
            }), $(".unassigned-orders").on("drop", function (t) {
                var e;
                return t.preventDefault(), e = document.getElementById(t.originalEvent.dataTransfer.getData("text")), null != e && $(e).hasClass("daily-order-tr") && !$(e).closest("table").hasClass("unassigned-orders") ? $.ajax({
                    url: "/orders/" + $(e).attr("id") + "/cancel_distribute",
                    type: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify({state: 2}),
                    dataType: "json",
                    success: function () {
                        return function () {
                            var t;
                            return t = $($(e).prevAll("tr.engineer-tr")[0]), null != t.get(0) && (M(t, -1), M($(t.prevAll(".assigned-dianbu-tr")[0]), -1)), m($(e)) || $(e).insertAfter($("tr.city-tr[data-name='" + $(e).data("city") + "']")[0]), $(e).data("label").setStyle({
                                color: "red",
                                opacity: 1,
                                borderStyle: "solid"
                            }), $(e).data("label").setZIndex(10)
                        }
                    }(this),
                    error: function () {
                        return alert("Network error.")
                    }
                }) : void 0
            }), $(".tooltip-parent").tooltip({selector: "span[data-toggle=tooltip]"}), $("#hsplitter").split({
                orientation: "horizontal",
                limit: 10,
                position: "60%"
            }), $("#vsplitter").split({
                orientation: "vertical",
                limit: 10,
                position: "50%"
            }), $("#map").length > 0 && "undefined" != typeof BMap && null !== BMap) {
            for (f = new BMap.Map("map"), f.enableScrollWheelZoom(), f.enableContinuousZoom(), f.centerAndZoom(new BMap.Point(116.393773, 39.989387), 13), window.map = f, $(".order-a").on("click", function () {
                var t;
                return t = $(this).closest("tr").data("marker"), null != t ? (f.panTo(t.getPosition()), t.setAnimation(BMAP_ANIMATION_BOUNCE), null != window.animate_mark && window.animate_mark.setAnimation(null), window.animate_mark = t) : void 0
            }), $(".dianbu-a").on("click", function () {
                var t, e;
                return t = $("#" + $(this).closest("tr").data("id")), null != t ? (e = new BMap.Point(parseFloat(t.data("lng")), parseFloat(t.data("lat"))), f.panTo(e)) : void 0
            }), e = function (t, e, i) {
                var n, a, r;
                return n = new BMap.Circle(t, 300, {
                    fillColor: "blue",
                    fillOpacity: 1
                }), f.addOverlay(n), a = new BMap.Circle(t, 5e3, {
                    fillColor: "red",
                    fillOpacity: .1,
                    strokeColor: "blue",
                    strokeWeight: 1,
                    strokeOpacity: .1
                }), f.addOverlay(a), r = new BMap.Label(e, {
                    position: t,
                    offset: new BMap.Size(-5, 1)
                }), r.setStyle({
                    color: "white",
                    backgroundColor: "black",
                    fontSize: "10px",
                    height: "12px",
                    lineHeight: "12px"
                }), r.addEventListener("click", function () {
                    var t, e, n, a, r;
                    for (a = $("tr[data-id='" + i + "']").get(), r = [], e = 0, n = a.length; n > e; e++)t = a[e], r.push(t.scrollIntoView());
                    return r
                }), f.addOverlay(r)
            }, C = $(".dianbu-li"), x = 0, D = C.length; D > x; x++)h = C[x], $(h).text() && !function (t) {
                var i, n, a;
                return $(t).data("lng") ? (a = new BMap.Point(parseFloat($(t).data("lng")), parseFloat($(t).data("lat"))), e(a, $(t).data("name"), t.id)) : (n = {
                    onSearchComplete: function (n) {
                        var a, r, s, o;
                        if (i.getStatus() === BMAP_STATUS_SUCCESS) {
                            for (o = [], r = 0, s = n.length; s > r; r++)if (a = n[r], a.getCurrentNumPois() > 0) {
                                e(a.getPoi(0).point, $(t).data("name"), t.id), $(t).data("lng", a.getPoi(0).point.lng).data("lat", a.getPoi(0).point.lat);
                                break
                            }
                            return o
                        }
                    }
                }, i = new BMap.LocalSearch($(t).data("city"), n), i.search([$(t).text()]))
            }(h);
            u = function (t, e) {
                var i, n, a, r, s, o, d, l, u, c, h;
                return i = .017453293, n = 6371, a = 1e3 * n, l = e[0] - t[0], o = e[1] - t[1], u = l * i, d = o * i, c = t[1] * i, h = e[1] * i, r = Math.pow(Math.sin(d / 2), 2) + Math.cos(c) * Math.cos(h) * Math.pow(Math.sin(u / 2), 2), s = 2 * Math.atan2(Math.sqrt(r), Math.sqrt(1 - r)), Math.round(a * s)
            }, m = function (t) {
                var e, i, n, a, r, s;
                for (n = 1e5, e = null, s = $(".dianbu-li"), a = 0, r = s.length; r > a; a++)h = s[a], $(h).data("lng") && t.data("city") === $(h).data("city") && (i = u([t.data("marker").getPosition().lng, t.data("marker").getPosition().lat], [parseFloat($(h).data("lng")), parseFloat($(h).data("lat"))]), n > i && (n = i, e = $("tr.dianbu-tr[data-id='" + h.id + "']")[0]));
                return e ? (t.insertAfter(e), M($(e), 1)) : void 0
            }, i = function (t, e) {
                var i, n;
                return $("#mqm-" + t.seq).fadeOut(), $("#mm-" + t.seq).fadeIn(), i = new BMap.Label(t.seq, {
                    position: e,
                    offset: new BMap.Size(1, -7)
                }), i.setStyle({
                    color: "red",
                    fontSize: "10px",
                    height: "15px",
                    lineHeight: "14px"
                }), i.setZIndex(10), i.addEventListener("click", function () {
                    var e;
                    return null != (e = document.getElementById(t.id)) && e.scrollIntoView(), $("#modal-map").modal("hide")
                }), i.addEventListener("mouseover", function () {
                    return this.setContent(t.seq + " " + t.state + ": " + t.address)
                }), i.addEventListener("mouseout", function () {
                    return this.setContent(t.seq)
                }), f.addOverlay(i), n = new BMap.Marker(e), n.addEventListener("click", function () {
                    var e;
                    return null != (e = document.getElementById(t.id)) ? e.scrollIntoView() : void 0
                }), f.addOverlay(n), $("#" + t.id).data("marker", n), $("#" + t.id).data("label", i), $("#" + t.id).closest("table").hasClass("unassigned-orders") ? m($("#" + t.id)) : $("#" + t.id).hasClass("daily-order-tr") ? (i.setStyle({
                    color: "grey",
                    opacity: .5,
                    borderStyle: "dotted"
                }), i.setZIndex(9)) : void 0
            }, n = function (t) {
                var e, n, a, r;
                for (r = [], n = 0, a = t.length; a > n; n++)e = t[n], r.push(function (t) {
                    var e, n, a, r, s;
                    return t.lng && t.lat ? (s = new BMap.Point(t.lng, t.lat), i(t, s)) : (r = {
                        onSearchComplete: function (e) {
                            var n, r, s, o;
                            if (a.getStatus() === BMAP_STATUS_SUCCESS) {
                                for (o = [], r = 0, s = e.length; s > r; r++)if (n = e[r], n.getCurrentNumPois() > 0) {
                                    i(t, n.getPoi(0).point);
                                    break
                                }
                                return o
                            }
                        }
                    }, e = function () {
                        var e, i, a;
                        for (a = [], n = e = i = t.address.length; e >= 9; n = e += -3)a.push(t.address.substring(0, n));
                        return a
                    }(), a = new BMap.LocalSearch(t.city, r), a.search(e))
                }(e));
                return r
            }, b = function () {
                var t, e, i, n;
                for (i = $(".daily-order-tr").get().reverse(), n = [], t = 0, e = i.length; e > t; t++)F = i[t], $(F).find("td:last-child").text() && n.push({
                    seq: $(F).data("seq"),
                    state: $(F).data("state"),
                    address: $(F).find("td:last-child").text(),
                    city: $(F).data("city"),
                    id: F.id,
                    lng: $(F).data("lng"),
                    lat: $(F).data("lat")
                });
                return n
            }(), n(b), b = function () {
                var t, e, i, n, a;
                for (i = $(".order-tr"), a = [], t = 0, e = i.length; e > t; t++)F = i[t], !$(F).children("td.order-address").text() || 0 !== (n = $(F).find("span.order-state").data("state")) && 2 !== n && 3 !== n && 4 !== n || a.push({
                    seq: $(F).children("td:first-child").text(),
                    state: $(F).find("span.order-state").text(),
                    address: $(F).children("td.order-address").text(),
                    city: $(F).data("city"),
                    id: F.id,
                    lng: $(F).data("lng"),
                    lat: $(F).data("lat")
                });
                return a
            }(), n(b), $("#order_address").length > 0 && (p = function () {
                var t, e, i;
                return i = $("#order_address").val(), !i || i.length < 4 ? void 0 : (f = window.map, f.clearOverlays(), e = {
                    onSearchComplete: function (e) {
                        var n, a, r, s, o, d, l, u;
                        if (t.getStatus() === BMAP_STATUS_SUCCESS) {
                            for (u = [], a = d = 0, l = e.getCurrentNumPois() - 1; l >= 0 ? l >= d : d >= l; a = l >= 0 ? ++d : --d) {
                                o = e.getPoi(a).point, n = new BMap.Circle(o, 100, {
                                    fillColor: "red",
                                    fillOpacity: 1
                                }), f.addOverlay(n), r = new BMap.Label(i, {
                                    position: o,
                                    offset: new BMap.Size(-15, 10)
                                }), r.setStyle({
                                    color: "white",
                                    backgroundColor: "black",
                                    fontSize: "10px",
                                    height: "12px",
                                    lineHeight: "12px"
                                }), f.addOverlay(r), s = new BMap.Marker(o), f.addOverlay(s), s.setAnimation(BMAP_ANIMATION_BOUNCE), f.centerAndZoom(o, 12), (new BMap.Geocoder).getLocation(o, function (t) {
                                    return $("#district-select option").filter(function () {
                                        return $(this).text() === t.addressComponents.district
                                    }).prop("selected", !0)
                                });
                                break
                            }
                            return u
                        }
                    }
                }, t = new BMap.LocalSearch($("option:selected", $("#order_city_id")).text(), e), t.search(i))
            }, $("#modal-map").on("show", function () {
                return p()
            }), p(), $("#district-select").change(function () {
                return $("#order_address").val($("option:selected", $("#order_city_id")).text() + $("option:selected", $(this)).text())
            }), $("#order_city_id").change(function () {
                return $.getScript("/cities/" + $(this).val())
            }), v = $("#order_address").val(), t = new BMap.Autocomplete({
                input: "order_address",
                location: window.map
            }), t.setInputValue(v), $(t).on("onconfirm", function (t) {
                return $("#order_city_id option").filter(function () {
                    return $(this).text() === t.originalEvent.item.value.city
                }).prop("selected", !0), $("#district-select option").filter(function () {
                    return $(this).text() === t.originalEvent.item.value.district
                }).prop("selected", !0)
            }))
        }
        return $(document).on("change", "#order_city_id", function () {
            var t;
            return t = $(this).val(), k(t), l(), $.getScript("/service_types/city_base_service_price?city_id=" + t)
        }), k = function (t) {
            return $("#order_city_id").val() ? ($(".shop_city").hide(), $(".shop_city_" + t).show(), $(".order-storehouse-city").each(function () {
                return $(this).val().indexOf(t) > -1 ? $(this).parent().show() : $(this).parent().hide()
            })) : void 0
        }, k($("#order_city_id").val()), $(document).on("change", "#order_user_type_id", function () {
            var t;
            return t = $(this).val(), S(t)
        }), S = function (t) {
            return $("#order_user_type_id").val() ? ($(".packages").hide(), $(".packages_" + t).show()) : void 0
        }, S($("#order_user_type_id").val()), $(document).on("change", "#engineer-belong-select", function () {
            var t;
            return t = $(this).val(), y(t)
        }), y = function (t) {
            return $("#engineer-belong-select").val() ? ($(".belong_engineer").hide(), $(".belong_engineer_" + t).show()) : void 0
        }, $(document).on("change", "#order_cancel_type", function () {
            var t;
            return t = $(this).val(), "2" === t ? ($(".order_serve_datetime").show(), $(".order_cancel_reason").hide()) : ($(".order_serve_datetime").hide(), $(".order_cancel_reason").show())
        }), g = $("#order_serve_datetime").val(), s = {}, d = function (t) {
            var e, i;
            return i = 0, s[t.toDateString()] && (i = s[t.toDateString()].reduce(function (t, e) {
                return t + e
            }, 0)), e = "" + $("#order_city_id option:selected").text() + " " + (t.getMonth() + 1) + "\u6708" + t.getDate() + "\u65e5", 0 >= i ? ($("#tomorrow-remind").html("" + e + " \u8fd0\u529b\u4e0d\u8db3").attr("class", "text-error"), g !== $("#order_serve_datetime").val() || -1 !== window.location.pathname.search("duplicate") ? $("#order_serve_datetime").val("") : void 0) : $("#tomorrow-remind").html("" + e + " \u6709\u8fd0\u529b").attr("class", "text-success")
        }, l = function () {
            var t, e;
            return c($("#order_serve_datetime").val()) ? (t = new Date($("#order_serve_datetime").val()), e = t.toDateString(), s[e] ? d(t) : $.getJSON("/city_capacity/" + $("#order_city_id").val() + ".json", {
                start_date: e,
                end_date: e
            }, function (e) {
                var i, n;
                for (i in e)n = e[i], s[new Date(i).toDateString()] = n;
                return d(t)
            })) : void 0
        }, $("#order_serve_datetime").on("input", function () {
            return l()
        }), $("div.datetimepicker").on("changeDate", function () {
            return l()
        }), l(), $(document).on("jinplace:done", ".pq-td", function () {
            var t;
            return t = $(this).closest("form").closest("tr").prev().find('a:contains("\u51fa\u5e93")').filter(function () {
                return "\u51fa\u5e93" === $(this).text()
            }), $.getScript(t[0].href)
        }), w = function () {
            return $(".st").each(function () {
                return $(this).is(":checked") ? ($("#parts_" + $(this).data("index")).show(), $("#comment_parts_" + $(this).data("index")).show()) : void 0
            })
        }, w(), $(document).on("click", ".st", function () {
            return $(this).is(":checked") ? ($("#parts_" + $(this).data("index")).show(), $("#comment_parts_" + $(this).data("index")).show()) : ($("#parts_" + $(this).data("index")).hide(), $("#comment_parts_" + $(this).data("index")).hide(), $("#parts_" + $(this).data("index") + " input[type=checkbox]").each(function () {
                return $(this).attr("checked", !1)
            }), $("#comment_parts_" + $(this).data("index") + " input[type=checkbox]").each(function () {
                return $(this).attr("checked", !1)
            }))
        }), $(document).on("click", ".st-label", function () {
            return $("#parts_" + $(this).data("index")).is(":hidden") ? ($("#parts_" + $(this).data("index")).show(), $("#comment_parts_" + $(this).data("index")).show()) : ($("#parts_" + $(this).data("index")).hide(), $("#comment_parts_" + $(this).data("index")).hide())
        }), $(document).on("click", ".part-select", function () {
            return $(this).is(":checked") ? $("#st_" + $(this).data("index")).prop("checked", !0) : void 0
        }), $(document).on("click", ".comment-parts table tr td input:checkbox", function () {
            return $(this).closest("table").find("input:checkbox").not(this).prop("checked", !1)
        }), $(document).on("change", ".unrelated-part", function () {
            var t, e;
            return e = $(this).parent().next().find("span").first(), t = $(this).parent().next().next().find("input").first(), $(t).attr("name", "order[part_counts][" + $(this).val() + "]"), $.get("/parts/" + $(this).val() + "/price", {city_id: $("#order_city_id").val()}, function (t) {
                return 1 === t.success ? ($(e).text(t.data.price + "|" + t.data.part_count), _()) : void 0
            })
        }), _ = function () {
            var t, e, i, n, a, r, s;
            for (i = [], $(".comment_part").each(function () {
                return $(this).is(":checked") ? i.push([$(this).next().text(), $(this).parent().next().text(), $(this).parent().next().next().next().find("input").val()]) : void 0
            }), $(".unrelated-part").each(function () {
                return "" !== $(this).val() ? i.push([$(this).next().val(), $(this).parent().next().find("span").text().split("|")[0], $(this).parent().next().next().find("input").val()]) : void 0
            }), $(".seleced-comment-part").each(function () {
                return $(this).is(":checked") ? i.push([$(this).next().text(), $(this).parent().next().text(), $(this).parent().next().next().find("input").val()]) : void 0
            }), $(".selective").remove(), s = [], a = 0, r = i.length; r > a; a++)e = i[a], n = $("#reserved").clone(), n.attr("id", ""), t = 0, n.children().each(function () {
                return $(this).text(e[t]), t += 1
            }), n.insertBefore($("#reserved")), n.addClass("selective"), s.push(n.show());
            return s
        }, $(document).on("click", ".comment_part", function () {
            return _()
        }), $(document).on("click", ".destroy-item", function () {
            return $(this).parent().parent().remove(), _()
        }), $(document).on("change", ".comment-part-count", function () {
            return _()
        }), _(), $(".search-outside-orders").click(function () {
            var t, e, i, n;
            return t = $("#select-car-location").val() + $("#order_car_num").val(), i = $("#order_phone_num").val(), n = $("#order_user_type_id").val(), e = $("#for-order-id").val(), $.get($(this).data("url"), {
                car_num: t,
                phone_num: i,
                user_type: n,
                order_id: e
            }, function (e) {
                var n, a;
                return 1 === e.success ? (n = e.data, a = "<table class='table table-striped'><thead><tr><th>\u8f66\u724c</th><th>\u59d3\u540d</th><th>\u8f66\u67b6\u53f7</th><th>\u624b\u673a\u53f7\u7801</th><th>\u670d\u52a1\u9700\u6c42</th><th>\u4e0a\u62a5\u65e5\u671f</th><th>\u6709\u6548\u671f</th><th>\u64cd\u4f5c</th></tr></thead><tbody>", n.car_num.length > 0 ? (a = a + "<tr><td>" + n.car_num + "</td><td>" + n.name + "</td><td>" + n.vin + "</td><td>" + n.phone_num + "</td><td>" + n.demand + "</td><td>" + n.reported_date + "</td><td>" + n.end_date + "</td>", a = n.insurance.length > 0 ? a + "<td><a href='/insurances/" + n.insurance + "/edit' target='_blank'>\u7f16\u8f91</a></td>" : a + "<td><a href='/insurances/new?phone_num=" + i + "&car_num=" + t + "' target='_blank'>\u65b0\u5efa</a></td>") : a += "<tr><td colspan='8'>\u65e0\u6570\u636e</td>", a += "</tr></tbody></table>", $(".insert-info").html(""), $(".insert-info").append(a)) : alert("\u7f51\u7edc\u5f02\u5e38")
            })
        }), $(".qrcode-fee").click(function () {
            var t, e;
            return e = $(this).attr("data-url"), t = $(this).attr("data-order-seq"), $("#feeModalLabel").text("\u8ba2\u5355\uff1a" + t), $("#generat-qrcode").attr("data-url", e), $("#qrcode").attr("src", ""), $("#fee").val(""), $("#feeModal").modal()
        }), $("#generat-qrcode").click(function () {
            var t, e;
            return (t = $("#fee").val()) ? (e = $(this).attr("data-url") + "&total_fee=" + t, $.get(e, {}, function (t) {
                return 1 === t.success ? $("#qrcode").attr("src", t.data.url) : alert("\u7f51\u7edc\u5f02\u5e38")
            })) : void alert("\u8bf7\u8f93\u5165\u6536\u6b3e\u91d1\u989d")
        })
    })
}.call(this),function () {
    $(function () {
        return $(".express-other-order").click(function () {
            return $("#other-order-express").attr("data-express-url", $(this).data("express-url")), $("#other-order-express").attr("data-index", $(this).data("index")), $("#expressModalLabel").text($(this).data("batch-number")), $("#express-num").val($("other_order_express_" + $(this).data("index")).text()), $("#expressOtherOrder").modal()
        }), $(document).on("change", ".product-item", function () {
            var t;
            return t = $(this), $.get("/parts/" + $(this).val() + "/ref_price", {}, function (e) {
                return 1 === e.success ? t.parent().next().find("input").val(e.data.price) : void 0
            })
        }), $("#other-order-express").click(function () {
            var t, e;
            return t = $("#express-num").val(), "" === t ? void alert("\u8bf7\u8f93\u5165\u5feb\u9012\u5355\u53f7") : (e = $(this).data("index"), $.post($(this).data("express-url"), {express_num: t}, function (i) {
                return 1 === i.success ? ($("#other_order_express_" + e).text(t), $("#expressOtherOrder").modal("hide")) : alert("\u7f51\u7edc\u5f02\u5e38")
            }))
        }), $(".other-order-payment").click(function () {
            return $("#payment").val($(this).data("payment")), $("#pay_way").val($(this).data("pay-way")), $("#card_number").val($(this).data("card-number")), "\u5237\u5361" === $(this).data("pay-way") ? $("#card_number,#lable_card_number").show() : $("#card_number,#lable_card_number").hide(), $("#other-order-pay").attr("data-finished-url", $(this).data("finished-url")), $("#finishedOtherOrder").modal()
        }), $("#other-order-pay").click(function () {
            var t, e, i;
            return i = $(this).attr("data-finished-url"), e = $("#payment").val(), t = $("#card_number").val(), $.post(i, {
                payment: e,
                card_number: t
            }, function (t) {
                return 1 === t.success ? (alert("\u5df2\u786e\u8ba4\u6536\u6b3e"), $("#finishedOtherOrder").modal("hide"), window.location.reload()) : alert("\u7f51\u7edc\u5f02\u5e38")
            })
        }), $(document).on("click", ".remove-item", function () {
            return $(this).parent().parent().remove()
        }), $(document).on("change", ".price-input", function () {
            var t;
            return t = 0, $(".price-input").each(function () {
                return t += $(this).val() * $(this).parent().next().find(".count-input").val()
            }), $("#other_order_payment_amount").val(t.toFixed(2))
        }), $(document).on("change", ".count-input", function () {
            var t;
            return t = 0, $(".price-input").each(function () {
                return t += $(this).val() * $(this).parent().next().find(".count-input").val()
            }), $("#other_order_payment_amount").val(t.toFixed(2))
        })
    })
}.call(this),function () {
    $(function () {
        var t;
        return $("#part_part_brand_id").change(function () {
            return $.getScript($(this).attr("rel") + "/" + $(this).val() + "?sh_id=" + ($("#storehouse_id").val() || "")), !1
        }), t = {}, $("#part-number-search").typeahead({
            minLength: 3, source: function (e, i) {
                return $.getJSON($("#part-number-search").data("link"), {search: e}, function (e) {
                    var n;
                    return t = {}, n = [], $.each(e, function () {
                        return n.push(this.number), t[this.number] = this._id
                    }), i(n)
                })
            }, matcher: function () {
                return !0
            }, highlighter: function (t) {
                return "<strong>" + t + "</strong>"
            }, updater: function (e) {
                return $.get("/parts/" + t[e] + "?sh_id=" + ($("#storehouse_id").val() || ""), null, null, "script"), e
            }
        })
    })
}.call(this),function () {
    $(function () {
        return $(document).on("click", "#parts .pagination a", function () {
            return $.getScript(this.href), !1
        }), $("#parts_search input").keyup($.debounce(1e3, function () {
            return $.get($("#parts_search").attr("action"), $("#parts_search").serialize(), null, "script"), !1
        })), $("#part_search_brand_id, #part_search_type_id").change(function () {
            return $.get($("#parts_search").attr("action"), $("#parts_search").serialize(), null, "script"), !1
        }), $(document).on("submit", "#page-num-form", function () {
            var t;
            return t = $("#parts_search").serialize() + "&" + $(this).serialize(), $("#checkbox-urlinfo").is(":checked") && (t += "&" + $("#checkbox-urlinfo").prop("name") + "=1"), $("#checkbox-no-urlinfo").is(":checked") && (t += "&" + $("#checkbox-urlinfo").prop("name") + "=1"), $.get($("#parts_search").attr("action"), t, null, "script"), !1
        }), $(document).on("submit", "#parts_search", function () {
            return !1
        }), $(document).on("click", "#checkbox-urlinfo,#checkbox-no-urlinfo", function () {
            var t;
            return $(this).closest("form").find("input:checkbox").not(this).prop("checked", !1), t = $("#parts_search").serialize() + "&" + $("#page-num-form").serialize(), $("#checkbox-urlinfo").is(":checked") && (t += "&" + $("#checkbox-urlinfo").prop("name") + "=1"), $("#checkbox-no-urlinfo").is(":checked") && (t += "&" + $("#checkbox-no-urlinfo").prop("name") + "=1"), $.get($("#parts_search").attr("action"), t, null, "script")
        }), $(document).on("change", "#part_match_brand_id", function () {
            var t;
            return t = "brand_id=" + $(this).val() + "&type_id=" + $("#part-match-type").prop("value"), $.get($(this).attr("rel"), t, null, "script")
        }), $(document).on("change", "#part_id", function () {
            return $.getScript($(this).attr("rel") + "/" + $(this).val() + "?sh_id=" + ($("#storehouse_id").val() || "")), !1
        }), $("#storehouse_part_transfer_to").submit(function () {
            return window.confirm($("#confirm_part_transfer_msg").text() + "\n" + $("#storehouse_name").text() + " -> " + $("#target_storehouse_id").find("option:selected").text() + "\n" + $("#part_part_brand_id").find("option:selected").text() + " " + $("#part_id").find("option:selected").text() + "\n" + $("label[for='quantity'").text() + ": " + $("#quantity").val()) ? void 0 : !1
        }), $("#storehouse_part_yingyusunhao").submit(function () {
            return window.confirm($("#storehouse_name").text() + "\n" + $("#part_part_brand_id").find("option:selected").text() + " " + $("#part_id").find("option:selected").text() + "\n" + $("label[for='quantity'").text() + ": " + $("#quantity").val()) ? void 0 : !1
        })
    })
}.call(this),function () {
    $(function () {
        var t;
        return $("#add-line").click(function () {
            var e;
            return e = $("#temp-tr").clone(), e.attr("id", ""), e.insertBefore($("#temp-tr")), e.show(), t()
        }), t = function () {
            return $(".searchable-dropdown").each(function () {
                var t, e, i;
                return t = $(this), i = $(this).data("current-value"), i + "" == "undefined" && (i = ""), e = $(this).next(), e.typeahead({
                    source: function (e) {
                        var i;
                        return i = [], t.children("option").each(function () {
                            var t;
                            return t = RegExp(e.split("").join(".*")), -1 !== $(this).text().search(t) && i.push($(this).text()), $(this).attr("data-pinyin") && -1 !== $(this).attr("data-pinyin").search(t) ? i.push($(this).text()) : void 0
                        }), i
                    }, matcher: function () {
                        return !0
                    }, highlighter: function (t) {
                        return "<strong>" + t + "</strong>"
                    }, updater: function (e) {
                        return t.children("option").filter(function () {
                            return $(this).html() === e
                        }).prop("selected", "selected").change(), e
                    }, items: 16, minLength: 1
                })
            })
        }, $(".show-arrival").click(function () {
            return $("#arrivalPurchaseModalLabel").text($(this).data("item-name")), $("#arrival-count").val($(this).data("count")), $("#item-confirmed").attr("data-post-url", $(this).data("post-url")), $("#item-confirmed").attr("data-item-id", $(this).data("item-id")), $("#item-confirmed").attr("data-index", $(this).data("index")), $("#arrivalPurchase").modal()
        }), $(document).on("click", "#item-confirmed", function () {
            return $.post($(this).data("post-url"), {
                item_id: $(this).attr("data-item-id"),
                arrival_count: $("#arrival-count").val()
            }, function (t) {
                return 1 === t.success ? (alert(t.msg), $("#item-" + $("#item-confirmed").attr("data-index")).hide(), $("#arrivalPurchase").modal("hide")) : void 0
            })
        }), $(".finished-purchase").click(function () {
            return $("#purchase-pay").attr("data-finished-url", $(this).data("finished-url")), $.get($(this).data("get-url"), {}, function (t) {
                var e, i, n;
                return 1 === t.success ? (i = t.data, n = 0, e = 0, $("#myModalLabel").text(i.batch_num), $("#tbody-items").children().remove(), $.each(i.items, function (t, i) {
                    var a;
                    return n += i.price * i.count, e += i.after_tax_price * i.count, a = "<tr><td>" + i.name + "</td><td>" + i.price + "</td><td>" + i.after_tax_price + "</td><td>" + i.count + "</td></tr>", $("#tbody-items").append(a)
                }), $("#payment-amount").children().remove(), $("#payment-amount").append("<p>\u603b\u989d: " + n + "\u5143; \u53bb\u7a0e\u540e\u603b\u989d: " + e + "\u5143; \u5df2\u652f\u4ed8: " + i.payment_amount + "\u5143</p>"), $("#need-pay").val(n - i.payment_amount), $("#finishedPurchase").modal()) : alert("\u7f51\u7edc\u5f02\u5e38")
            })
        }), $("#purchase-pay").click(function () {
            return $.post($(this).data("finished-url"), {payment_amount: $("#need-pay").val()}, function (t) {
                return 1 === t.success ? $("#finishedPurchase").modal("hide") : alert(t.msg)
            })
        }), $(".express-purchase").click(function () {
            return $("#purchase-express").attr("data-express-url", $(this).data("express-url")), $("#purchase-express").attr("data-index", $(this).data("index")), $("#expressModalLabel").text($(this).data("batch-number")), $("#express-num").val($("purchase_express_" + $(this).data("index")).text()), $("#expressPurchase").modal()
        }), $("#purchase-express").click(function () {
            var t, e;
            return t = $("#express-num").val(), "" === t ? void alert("\u8bf7\u8f93\u5165\u5feb\u9012\u5355\u53f7") : (e = $(this).data("index"), $.post($(this).data("express-url"), {express_num: t}, function (i) {
                return 1 === i.success ? ($("#purchase_express_" + e).text(t), $("#expressPurchase").modal("hide")) : alert("\u7f51\u7edc\u5f02\u5e38")
            }))
        }), $(document).on("click", ".remove-item", function () {
            return $(this).parent().parent().remove()
        }), $(document).on("change", ".search-price", function () {
            var t;
            return t = $(this), $.get("/parts/" + $(this).val() + "/average_price", {}, function (e) {
                return 1 === e.success ? t.parent().next().find("input").val(e.data.price) : void 0
            })
        })
    })
}.call(this),function () {
    $(function () {
        return $(".searchable-dropdown").each(function () {
            var t, e, i;
            return t = $(this), i = $(this).data("current-value"), i + "" == "undefined" && (i = ""), e = $('<input class="string" size="25" type="text" value="' + i + '" placeholder="\u6c49\u5b57\u6216\u62fc\u97f3\u641c\u7d22"></input>'), e.insertAfter($(this)), e.typeahead({
                source: function (e) {
                    var i;
                    return i = [], t.children("option").each(function () {
                        var t;
                        return t = RegExp(e.split("").join(".*")), -1 !== $(this).text().search(t) && i.push($(this).text()), $(this).attr("data-pinyin") && -1 !== $(this).attr("data-pinyin").search(t) ? i.push($(this).text()) : void 0
                    }), i
                }, matcher: function () {
                    return !0
                }, highlighter: function (t) {
                    return "<strong>" + t + "</strong>"
                }, updater: function (e) {
                    return t.children("option").filter(function () {
                        return $(this).html() === e
                    }).prop("selected", "selected").change(), e
                }, items: 16, minLength: 1
            })
        })
    })
}.call(this),function () {
    $(function () {
        return $("#service_type_specific_auto_model").is(":checked") || $("#service_type_auto_model_div").hide(), $("#service_type_specific_auto_model").on("click", function () {
            return $("#service_type_auto_model_div").toggle()
        })
    })
}.call(this),function () {
    $(function () {
        return $(document).on("click", "#partbatches .pagination a", function () {
            return $.getScript(this.href), !1
        }), $("#part_type_id").change(function () {
            return $.get($(this).attr("rel") + "/" + $(this).val(), null, null, "script"), !1
        })
    })
}.call(this),function () {
}.call(this),function () {
}.call(this),function () {
}.call(this),function () {
    $(function () {
        var t, e, i, n, a, r, s, o;
        return ($("table#with_engineer_statistics").length > 0 || $("table#with_vehicle_statistics").length > 0) && $("#sb-site.top-padding").css({"z-index": "initial"}), $("table#with_engineer_statistics").on("click", "td.detail", function () {
            var t, e, i;
            return t = $(this).closest("tr").data("assignee_id"), i = $(this).data("id"), e = "user", $.get("/tool_assignments/single_operate", {
                assignee_id: t,
                tool_type_id: i,
                assignee_type: e
            }, function (t) {
                return $("#with_engineer_statistics_modal").modal({keyboard: !0}).find(".modal-body").html(t)
            })
        }), $("table#with_vehicle_statistics").on("click", "td.detail", function () {
            var t, e, i;
            return t = $(this).closest("tr").data("assignee_id"), i = $(this).data("id"), e = "service_vehicle", $.get("/tool_assignments/single_operate", {
                assignee_id: t,
                tool_type_id: i,
                assignee_type: e
            }, function (t) {
                return $("#with_vehicle_statistics_modal").modal({keyboard: !0}).find(".modal-body").html(t)
            })
        }), $(document).on("ajax:before", "form.tool_assign", function () {
            var t, e, i;
            return e = $(this).find("input[name=quantity]"), t = parseInt(e.val()), i = parseInt($(this).find("span.target_stock").text()), isNaN(t) ? (alert("\u8bf7\u586b\u5165\u8981\u5206\u914d\u7684\u6570\u91cf"), e.focus(), !1) : 0 >= t ? (alert("\u5206\u914d\u6570\u91cf\u5fc5\u987b\u5927\u4e8e0"), e.focus(), !1) : t > i ? (alert("\u5206\u914d\u6570\u91cf\u4e0d\u80fd\u8d85\u8fc7\u5e93\u5b58\u6570"), e.focus(), !1) : void 0
        }), $(document).on("ajax:before", "form.tool_assignment_discard", function () {
            if ("exhausted" !== $(this).find("[name=discard_type]").val()) {
                if ("" === $.trim($(this).find("[name=responsible_user_name]").val()) && 0 === $(this).find(".default_responsible_user_tip").length)return alert("\u8bf7\u586b\u5199\u8d23\u4efb\u4eba"), !1;
                if ("" === $.trim($(this).find("[name=responsibility_type]").val()))return alert("\u8bf7\u9009\u62e9\u8d23\u4efb\u8ba4\u5b9a"), !1
            }
        }), $(document).on("ajax:before", "form.tool_discharge", function () {
            var t, e, i;
            return i = $(this).find("input[name=quantity]"), e = parseInt(i.val()), t = parseInt($(this).find("span.assign_count").text()), isNaN(e) ? (alert("\u8bf7\u586b\u5165\u8981\u6536\u56de\u7684\u6570\u91cf"), i.focus(), !1) : 0 >= e ? (alert("\u6536\u56de\u6570\u91cf\u5fc5\u987b\u5927\u4e8e0"), i.focus(), !1) : e > t ? (alert("\u6536\u56de\u6570\u91cf\u4e0d\u80fd\u8d85\u8fc7\u5df2\u5206\u914d\u6570"), i.focus(), !1) : void 0
        }), $(document).on("ajax:before", "form.auto_delivery_for_tool_assignment", function () {
            var t, e, i;
            return i = $(this).find("input[name=quantity]"), e = parseInt(i.val()), t = parseInt($(this).find("span.city_stock").text()), isNaN(e) ? (alert("\u8bf7\u586b\u5165\u8c03\u8d27\u6570\u91cf"), i.focus(), !1) : 0 >= e ? (alert("\u8c03\u8d27\u6570\u91cf\u5fc5\u987b\u5927\u4e8e0"), i.focus(), !1) : e > t ? (alert("\u8c03\u8d27\u6570\u91cf\u4e0d\u80fd\u8d85\u8fc7\u57ce\u5e02\u5e93\u5b58\u6570\u91cf"), i.focus(), !1) : void 0
        }), $(document).on("ajax:success", "form.auto_delivery_for_tool_assignment", function (t, e) {
            var i, n;
            return e.success === !0 ? ($(this).closest(".modal-body").find("ul.nav-tabs a[href=#assign_tab]").trigger("click"), n = parseInt($(this).find("input[name=quantity]").val()), $(this).closest(".modal-body").find(".city_stock").each(function () {
                return $(this).text(parseInt($(this).text()) - n)
            }), $(this).closest(".modal-body").find(".storehouse_stock").each(function () {
                return $(this).text(parseInt($(this).text()) + n)
            })) : e.deliver === !0 ? (i = $(this).data("manual_receive_path"), $(this).find("p.error").remove(), $(this).prepend("<p class='error text-error'>\u8c03\u8d27\u6210\u529f\uff0c\u4f46\u662f\u81ea\u52a8\u6536\u8d27\u5931\u8d25\uff0c\u8bf7\u5230<a href='" + i + "'>\u8fd9\u91cc</a>\u8fdb\u884c\u4eba\u5de5\u6536\u8d27\u3002</p>")) : ($(this).find("p.error").remove(), $(this).prepend("<p class='error text-error'>\u8c03\u8d27\u5931\u8d25\u3002" + e.error + "</p>"))
        }), $(".fixed_headers").length > 0 && ($("html").css({"overflow-x": "visible"}), $("body").css({"overflow-x": "visible"}), n = $(".fixed_target"), o = n.find("thead"), i = $(".fixed_headers").append(o.clone()), i.width(n.width()), $.each(o.find("tr > th"), function (t, e) {
            var n;
            return n = $(e).width(), $(i.find("tr > th")[t]).width(n)
        }), a = $("#fixed-top").height(), i.css({top: a}), s = n.offset().top - a, r = n.offset().left, $(window).bind("scroll", function () {
            var t, e;
            return e = $(this).scrollTop(), t = $(this).scrollLeft(), i.css({left: r - t}), e >= s && i.is(":hidden") ? i.show() : s > e ? i.hide() : void 0
        })), $(".fixed_columns").length > 0 && ($("html").css({"overflow-x": "visible"}), $("body").css({"overflow-x": "visible"}), e = $(".fixed_columns"), n = $(".fixed_target"), $.each(n.find(".fixed_col"), function (t, i) {
            var n;
            return n = $(e.find("tr > th")[t]), n.width($(i).width()), n.height($(i).height())
        }), $.each(n.find("tbody tr"), function (t, i) {
            var n;
            return n = e.find("tbody tr").eq(t), $.each($(i).find("td.fixed_cell"), function (t, e) {
                var i;
                return i = n.find("td.fixed_cell").eq(t), i.width($(e).width()), i.height($(e).height())
            })
        }), t = n.find(".fixed_col").offset().left, r = n.offset().left, $(window).bind("scroll", function () {
            var i;
            return i = $(this).scrollLeft(), e.css({left: i - r}), i >= t && e.is(":hidden") ? e.show() : t > i ? e.hide() : void 0
        })), $("#tool_engineer_search").typeahead({
            source: function () {
                var t;
                return t = [], $.each(this.$element.data("source"), function (e) {
                    return t.push(e)
                }), t
            }, updater: function (t) {
                var e;
                return e = this.$element.data("source")[t], $("#responsible_user_id").val(e), t
            }
        }), $(".tool_statistics_modal").on("click", "a.auto_delivey_btn", function () {
            return $(this).closest(".modal-body").find("ul.nav-tabs a[href=#auto_delivery_tab]").trigger("click")
        }), $(".tool_statistics_modal").on("click", "a.back_to_assign_btn", function () {
            return $(this).closest(".modal-body").find("ul.nav-tabs a[href=#assign_tab]").trigger("click")
        }), $(".tool_statistics_modal").on("change", ".discard_type", function () {
            var t;
            return t = $(this).closest("form").find(".quantity_control"), "exhausted" === $(this).val() ? t.show() : t.hide()
        })
    })
}.call(this),$(function () {
    var t = {};
    $("#tool_detail_search").typeahead({
        minLength: 2, source: function (e, i) {
            var n = this.$element;
            return $.getJSON("/tool_details", {tool_type_name: e}, function (e) {
                t = {};
                var a = $.map(e, function (e) {
                    var i = e.identification;
                    if (0 == n.data("with_tool_supplier")) {
                        var a = i.split("-");
                        i = a[0] + "-" + a[1]
                    }
                    return void 0 == t[i] ? (t[i] = e, i) : void 0
                });
                return i(a)
            })
        }, matcher: function () {
            return !0
        }, updater: function (e) {
            return $("#tool_detail_search").data("tool_detail", t[e]), e
        }
    }), $("#add_tool_batch_item").on("click", function () {
        var t = $("#tool_detail_search").data("tool_detail"), e = $($("#tool_batch_item_blueprint").data("blueprint")), i = $("#tool_detail_items");
        e.find("input.tool_detail_id").val(t._id), e.find("td.tool_type").text(t.tool_type.identification), e.find("td.tool_brand").text(t.tool_brand.name), e.find("td.tool_supplier").text(t.tool_supplier.name), e.find("td.lifetime input").val(t.lifetime), e.find("td.warranty_period input").val(t.warranty_period), e.find("td.price input").val(t.price_to_f), i.append(e), $("#tool_detail_search").removeData("tool_detail").val("")
    }), $("#tool_detail_items").on("click", " a.remove_tool_batch_item", function () {
        $(this).closest("tr").remove()
    })
}),$(function () {
    $("#tool_delivery_items").on("nested:fieldAdded", function (t) {
        var e = $("#tool_detail_search").data("tool_detail"), i = t.field.find(".tool_type"), n = t.field.find(".tool_brand");
        i.find(".tool_type_name").text(e.tool_type.identification), i.find(".tool_type_id").val(e.tool_type_id), n.find(".tool_brand_name").text(e.tool_brand.name), n.find(".tool_brand_id").val(e.tool_brand_id), $("#tool_detail_search").removeData("tool_detail").val("")
    }), $(".tool_delivery_note").popover({placement: "top"}), $(".choose_site_type").on("click", "input:radio", function () {
        var t = $(this).data("group"), e = $(this).val();
        $("." + t).find(".site_type").hide(), $("." + t).find("select").attr("disabled", "disabled"), $("." + t).find("." + e).show(), $("." + t).find("." + e).find("select").removeAttr("disabled")
    })
}),function () {
    $(function () {
        return $(".tool_history_note").popover({placement: "left"}), $(".disabled_export_explanation").tooltip(), $("#tool_history_export").on("click", function () {
            var t, e, i;
            return t = $(this), t.button("loading"), i = parseInt(t.data("loading-text")), e = setInterval(function () {
                return i -= 1, 0 >= i ? (clearInterval(e), t.button("reset")) : t.val(i)
            }, 1e3)
        })
    })
}.call(this),function () {
    $(function () {
        return $("#tool_type_search").typeahead({
            minLength: 2, source: function (t, e) {
                var i, n;
                return i = this.$element, n = [], $.getJSON("/tool_types", {tool_type_name: t}, function (t) {
                    var a;
                    return a = {}, $.each(t, function (t, e) {
                        return a[e.identification] = e._id, n.push(e.identification)
                    }), i.data("source", a), e(n)
                })
            }, matcher: function () {
                return !0
            }, updater: function (t) {
                var e;
                return e = this.$element.data("source")[t], $("#tool_type_id").val(e), t
            }
        })
    })
}.call(this),$(function () {
    $(".tools .popover_discarded_info").popover({
        trigger: "hover",
        html: !0,
        placement: "top"
    }), $(".tool_statistics_cell").popover({
        trigger: "hover",
        html: !0,
        placement: "top"
    }), $("table#tool_statistics").length > 0 && $("#sb-site.top-padding").css({"z-index": "initial"}), $("table#tool_statistics").on("click", "td.drill_down", function () {
        var t = $(this).closest("tr").data("tool_type_id"), e = $(this).data("location_id"), i = $(this).data("location_type"), n = $("#display").val();
        $.get("/tools/single_operate", {tool_type_id: t, location_id: e, location_type: i, display: n}, function (t) {
            "" != t && $("#local_tool_modal").modal({keyboard: !0}).find(".modal-body").html(t)
        })
    }), $("#local_tool_modal").on("change", ".discard_type", function () {
        quantity_control = $(this).closest("form").find(".quantity_control"), "exhausted" == $(this).val() ? quantity_control.show() : quantity_control.hide()
    }), $(document).on("ajax:before", "form.tool_discard", function () {
        if ("exhausted" != $(this).find("[name=discard_type]").val()) {
            if ("" == $.trim($(this).find("[name=responsible_user_name]").val()))return alert("\u8bf7\u586b\u5199\u8d23\u4efb\u4eba"), !1;
            if ("" == $.trim($(this).find("[name=responsibility_type]").val()))return alert("\u8bf7\u9009\u62e9\u8d23\u4efb\u8ba4\u5b9a"), !1
        }
    })
}),function () {
    $(function () {
        return $("#user_set_state_0").click(function () {
            return $.getScript("/curr_user_state?state=0"), $("#user_state_id").dropdown("toggle"), !1
        }), $("#user_set_state_1").click(function () {
            return $.getScript("/curr_user_state?state=1"), $("#user_state_id").dropdown("toggle"), !1
        }), $("#user_set_state_2").click(function () {
            return $.getScript("/curr_user_state?state=2"), $("#user_state_id").dropdown("toggle"), !1
        })
    })
}.call(this),function () {
}.call(this),$(function () {});
