using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FramboJSe_Test.App_Code.Serializers.Base
{
    /// <summary>
    /// Generic BASE Request.
    /// </summary>
    [System.SerializableAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    [System.Xml.Serialization.XmlRootAttribute(Namespace = "", IsNullable = false)]
    public class Request
    {

        protected RequestGeneral generalField;
        protected RequestData dataField;
        protected string idField;

        /// <remarks/>
        public RequestGeneral General
        {
            get {
                return this.generalField;
            }
            set {
                this.generalField = value;
            }
        }
        /// <remarks/>
        public RequestData Data
        {
            get {
                return this.dataField;
            }
            set {
                this.dataField = value;
            }
        }
        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string ID
        {
            get {
                return this.idField;
            }
            set {
                this.idField = value;
            }
        }
    }

    /// <summary>
    /// Generic node GENERAL
    /// </summary>
    [System.SerializableAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    public class RequestGeneral
    {

        protected string tokenField;

        /// <remarks/>
        public string Token
        {
            get {
                return this.tokenField;
            }
            set {
                this.tokenField = value;
            }
        }
    }

    /// <summary>
    /// Generic node DATA
    /// </summary>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    public class RequestData
    {

    }
}