using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FramboJSe_Test.App_Code.Serializers.General_SET
{
    /// <summary>
    /// Response for GENERAL (HEADER) service -> SET method.
    /// </summary>
    [System.SerializableAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    [System.Xml.Serialization.XmlRootAttribute(Namespace = "", IsNullable = false)]
    public class Request
    {

        private Base.RequestGeneral generalField;
        private RequestData dataField;
        private string idField;

        /// <remarks/>
        public Base.RequestGeneral General
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


    /// <remarks/>
    [System.SerializableAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    public class RequestData
    {

        private string _nome;
        private string _logo;

        public string Nome
        {
            get {
                return this._nome;
            }
            set {
                this._nome = value;
            }
        }
        public string Logo
        {
            get {
                return this._logo;
            }
            set {
                this._logo = value;
            }
        }
    }


}